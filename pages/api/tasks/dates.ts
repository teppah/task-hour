import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import Task from "lib/Task";
import getTasks from "lib/get-tasks";
import { parseISO, isValid } from "date-fns";
import createHandler from "lib/api/handler";
import databaseHelper from "lib/api/database-helper";

type Response = {
  tasks: Task[];
};

const handler = createHandler<Response>();

handler
  // get all tasks with empty start dates here
  .get(async (req, res) => {
    const tasks = await databaseHelper.getTasks();
    const filtered = tasks.filter((t) => !isValid(t.startDate));
    res.json({ tasks: filtered });
  });

export default handler;
