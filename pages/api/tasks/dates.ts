import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import Task from "lib/Task";
import getTasks from "lib/get-tasks";
import { parseISO, isValid } from "date-fns";
import createHandler from "lib/api/handler";

type Response = {
  tasks: Task[];
};

const handler = createHandler<Response>();

handler
  // get all tasks with empty start dates here
  .get((req, res) => {
    const filtered = getTasks().filter((t) => !t.startDate);
    res.json({ tasks: filtered });
  });

export default handler;
