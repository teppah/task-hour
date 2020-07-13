import nc from "next-connect";
import Task, { createTask } from "lib/Task";
import { set, subWeeks, subDays } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";
import getTasks from "lib/get-tasks";
import createHandler from "lib/api/handler";
import databaseHelper from "lib/api/database-helper";

type Response = {
  tasks: Task[];
};

const handler = createHandler<Response>();

handler.get(async (req, res) => {
  try {
    const tasks = await databaseHelper.getTasks();
    res.json({ tasks: tasks });
  } catch (e) {
    console.log(`ERROR`);
    console.log(e);
    res.status(500).json(e);
  }
});

export default handler;
