import nc from "next-connect";
import Task, { createTask } from "data/Task";
import { set, subWeeks, subDays } from "date-fns";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";
import getTasks from "data/get-tasks";

type Response = {
  tasks: Task[];
};

const handler = nc<NextApiRequest, NextApiResponse<Response>>().get(
  (req, res) => {
    const tempTasks = getTasks();
    const { taskId } = req.query;
    const returnedTasks = taskId
      ? tempTasks.filter((t) => t.taskId === taskId)
      : tempTasks;
    res.json({ tasks: returnedTasks });
  }
);

export default handler;
