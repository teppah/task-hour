import nc from "next-connect";
import Task, { createTask } from "lib/Task";
import { set, subWeeks, subDays, parseISO } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";
import getTasks from "lib/get-tasks";
import { assignInWith, AssignCustomizer, isUndefined } from "lodash";

type Response = {
  task: Task;
};

const customizer: AssignCustomizer = (objVal, srcVal) => {
  return isUndefined(srcVal) ? objVal : srcVal;
};
const handler = nc<NextApiRequest, NextApiResponse<Response>>()
  .get((req, res) => {
    const tempTasks = getTasks();
    const { taskId } = req.query;
    if (!taskId) {
      res.status(400).end(`Error 400 - Missing taskId`);
      return;
    }
    const returnedTask = tempTasks.find((t) => t.taskId === taskId);
    res.json({ task: returnedTask });
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
        startDate: startDate ? parseISO(startDate) : null,
        endDate: endDate ? parseISO(endDate) : null,
        isComplete,
      },
      customizer
    );

    res.json({ task: toUpdate });
  });

export default handler;
