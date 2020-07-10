import nc from "next-connect";
import Task, { createTask } from "lib/Task";
import { set, subWeeks, subDays, parseISO, isValid } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";
import getTasks from "lib/get-tasks";
import {
  assignInWith,
  AssignCustomizer,
  isUndefined,
  isNull,
  remove,
} from "lodash";
import { nanoid } from "nanoid";
import createHandler from "lib/api/handler";

type Response = {
  task: Task;
};

const customizer: AssignCustomizer = (objVal, srcVal) => {
  return isUndefined(srcVal) || isNull(srcVal) ? objVal : srcVal;
};
const handler = createHandler<Response>();

handler
  .get((req, res) => {
    const tempTasks = getTasks();
    const { taskId } = req.query;
    if (!taskId) {
      res.status(400).end(`Error 400 - Missing taskId`);
      return;
    }
    const returnedTask = tempTasks.find((t) => t.taskId === taskId);
    if (!returnedTask) {
      res.status(404).end("404 Task Not Found");
      return;
    }
    res.json({ task: returnedTask });
  })
  .post((req, res) => {
    const { title, description, startDate, endDate, isComplete } = req.body;
    const start = parseISO(startDate);
    const end = parseISO(endDate);
    const completionStatus = isComplete === "true";
    if (!title || !description || !isValid(start) || !isValid(end)) {
      res.status(400).end(`400 Malformed Request`);
      return;
    }
    const taskId = nanoid();
    const toCreate: Task = {
      taskId,
      title,
      description,
      startDate: start,
      endDate: end,
      isComplete: completionStatus,
    };
    getTasks().push(toCreate);
    res.json({ task: toCreate });
  })
  .put((req, res) => {
    const tasks = getTasks();
    const { taskId } = req.query;
    const { title, description, startDate, endDate, isComplete } = req.body;
    const toUpdate = tasks.find((t) => t.taskId === taskId);
    if (!toUpdate) {
      res.status(404).end("404 Task Not Found");
      return;
    }
    assignInWith(
      toUpdate,
      {
        title,
        description,
        // cannot set empty date in this path
        startDate: startDate ? parseISO(startDate) : null,
        endDate: endDate ? parseISO(endDate) : null,
        isComplete,
      },
      customizer
    );
    res.json({ task: toUpdate });
  })
  .delete((req, res) => {
    const tasks = getTasks();
    const { taskId } = req.query;
    if (!taskId) {
      res.status(400).end("400 Malformed Request - `Missing taskId`");
      return;
    }
    const toDelete = tasks.find((t) => t.taskId === taskId);
    if (!toDelete) {
      res.status(404).end(`404 Task Not Found`);
      return;
    }
    remove(tasks, (t) => t.taskId === taskId);
    res.json({ task: toDelete });
  });

export default handler;
