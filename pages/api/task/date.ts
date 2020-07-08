import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import Task from "lib/Task";
import getTasks from "lib/get-tasks";
import { parseISO, isValid } from "date-fns";

type Response = {
  task: Task;
};

const handler = nc<NextApiRequest, NextApiResponse<Response>>()
  // specifically update a task's dates
  .put((req, res) => {
    const { taskId } = req.query;
    const { startDate, endDate } = req.body;
    const start = parseISO(startDate);
    const end = parseISO(endDate);
    if (!taskId) {
      res.status(400).end(`400 Malformed Request`);
      return;
    }
    const tasks = getTasks();
    const toUpdate = tasks.find((t) => t.taskId === taskId);
    if (!toUpdate) {
      res.status(404).end(`400 Task Not Found`);
      return;
    }
    toUpdate.startDate = isValid(start) ? start : null;
    toUpdate.endDate = isValid(end) ? end : null;
    res.json({ task: toUpdate });
  });

export default handler;
