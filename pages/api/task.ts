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
import databaseHelper from "lib/api/database-helper";

type Response = {
  task: Task;
};

const customizer: AssignCustomizer = (objVal, srcVal) => {
  return isUndefined(srcVal) || isNull(srcVal) ? objVal : srcVal;
};
const handler = createHandler<Response>();

handler
  .get(async (req, res) => {
    const { taskId } = req.query;
    if (!taskId) {
      res.status(400).end(`Error 400 - Missing taskId`);
      return;
    }
    try {
      const task = await databaseHelper.getTask(<string>taskId);
      res.json({ task: task });
    } catch (e) {
      if (e.requestResult.statusCode === 404) {
        res.status(404).end(`404 Task Not Found`);
      } else {
        res.status(500).json(e);
      }
    }
  })
  .post(async (req, res) => {
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
    const createdTask = await databaseHelper.createTask(toCreate);
    res.json({ task: createdTask });
  })
  .put(async (req, res) => {
    const { taskId } = req.query;
    const { title, description, startDate, endDate, isComplete } = req.body;
    const toUpdate = await databaseHelper.getTask(<string>taskId);
    try {
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
      // TODO: implement task update
      res.json({ task: toUpdate });
    } catch (e) {
      if (e.requestResult.statusCode === 404) {
        res.status(404).end(`404 Task Not Found`);
      } else {
        res.status(500).json(e);
      }
    }
  })
  .delete(async (req, res) => {
    const { taskId } = req.query;
    if (!taskId) {
      res.status(400).end("400 Malformed Request - `Missing taskId`");
      return;
    }
    const toDelete = await databaseHelper.getTask(<string>taskId);
    if (!toDelete) {
      res.status(404).end(`404 Task Not Found`);
      return;
    }
    // TODO: implement delete task
    res.json({ task: toDelete });
  });

export default handler;
