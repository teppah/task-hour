import nc from "next-connect";
import Task, { createTask } from "lib/Task";
import { set, subWeeks, subDays } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";
import getTasks from "lib/get-tasks";

type Response = {
  task: Task;
};

const handler = nc<NextApiRequest, NextApiResponse<Response>>().get(
  (req, res) => {
    const tempTasks = getTasks();
    const { taskId } = req.query;
    if (!taskId) {
      res.status(400).end(`Error 400 - Missing taskId`);
      return;
    }
    const returnedTask = tempTasks.find((t) => t.taskId === taskId);
    res.json({ task: returnedTask });
  }
);

export default handler;
