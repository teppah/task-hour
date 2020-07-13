import Task from "lib/Task";
import getTasks from "lib/get-tasks";
import { parseISO, isValid, differenceInHours, addHours } from "date-fns";
import createHandler from "lib/api/handler";
import databaseHelper from "lib/api/database-helper";

type Response = {
  task: Task;
};

const handler = createHandler<Response>();
// route automatically updates the endDate if startDate is changed
handler
  // specifically update a task's dates
  .put(async (req, res) => {
    const { taskId } = req.query;
    const { startDate, endDate } = req.body;
    const start = parseISO(startDate);
    const end = parseISO(endDate);
    if (!taskId) {
      res.status(400).end(`400 Malformed Request`);
      return;
    }
    const tasks = await databaseHelper.getTasks();
    const toUpdate = tasks.find((t) => t.taskId === taskId);
    if (!toUpdate) {
      res.status(404).end(`400 Task Not Found`);
      return;
    }
    // LOGIC
    // if start is present, end is present
    //    specify both

    // if start is not present, end is present
    //    only update end

    // if start is present, end is not present
    //    check whether end time is present on retrieved task
    //      if true
    //          compute original date hour difference,
    //          create new date with the difference
    //      else
    //          create new end date from specified start
    //          add 1 hour (default)

    // if neither are present, set dates to null
    const updateObj: { startDate: Date; endDate: Date } = {
      startDate: null,
      endDate: null,
    };
    if (isValid(start)) {
      updateObj.startDate = start;
      if (isValid(end)) {
        updateObj.endDate = end;
      } else {
        if (isValid(toUpdate.endDate)) {
          const difference = differenceInHours(
            toUpdate.endDate,
            toUpdate.startDate
          );
          const newEnd = addHours(start, difference);
          updateObj.endDate = newEnd;
        } else {
          // default length: 1h
          const newEnd = addHours(start, 1);
          updateObj.endDate = newEnd;
        }
      }
    } else {
      if (isValid(end)) {
        updateObj.startDate = toUpdate.startDate;
        updateObj.endDate = end;
      }
    }
    console.log(updateObj);
    const updated = await databaseHelper.updateTaskDates(
      <string>taskId,
      updateObj.startDate,
      updateObj.endDate
    );
    res.json({ task: updated });
  });

export default handler;
