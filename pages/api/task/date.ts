import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import Task from "lib/Task";
import getTasks from "lib/get-tasks";
import { parseISO, isValid, differenceInHours, addHours } from "date-fns";
import createHandler from "lib/api/handler";

type Response = {
  task: Task;
};

const handler = createHandler<Response>();
// route automatically updates the endDate if startDate is changed
handler
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
    if (isValid(start)) {
      const difference = differenceInHours(
        toUpdate.endDate,
        toUpdate.startDate
      );
      // if no end date specified, compute end date from difference
      if (!isValid(end)) {
        const newEnd = addHours(start, difference);
        toUpdate.endDate = newEnd;
      } else {
        toUpdate.endDate = end;
      }
      toUpdate.startDate = start;
    } else {
      // if no start date specified, only update end date
      if (isValid(end)) {
        toUpdate.endDate = end;
      } else {
        // else clear all date to become dateless
        toUpdate.startDate = null;
        toUpdate.endDate = null;
      }
    }
    res.json({ task: toUpdate });
  });

export default handler;
