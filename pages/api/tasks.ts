import nc from "next-connect";
import Task, { createTask } from "lib/Task";
import { set, subWeeks, subDays } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";
import getTasks from "lib/get-tasks";
import createHandler from "lib/api/handler";

type Response = {
  tasks: Task[];
};

const handler = createHandler<Response>();

handler.get((req, res) => {
  const tempTasks = getTasks();
  const { taskId } = req.query;
  res.json({ tasks: tempTasks });
});

export default handler;
