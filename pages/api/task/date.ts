import Task from "lib/shared/Task";
import { parseISO, isValid, differenceInHours, addHours } from "date-fns";
import createHandler from "lib/api/handler";
import taskHelper from "lib/api/task-helper";
import ServerSideUser from "lib/shared/user/ServerSideUser";
import authenticatedRoute from "lib/api/authenticated-route";

type Response = {
  task: Task;
};

const handler = createHandler<Response>();
// route automatically updates the endDate if startDate is changed
handler
  .use(authenticatedRoute)
  // specifically update a task's dates
  .put(async (req, res) => {
    const { taskId } = req.query;
    const { startDate, endDate } = req.body;
    const start = parseISO(startDate);
    const end = parseISO(endDate);
    if (!taskId) {
      res.status(400).end(`400 Missing taskId`);
      return;
    }
    const user = req.session.get<ServerSideUser>("user");
    const toUpdate = await taskHelper.getTask(user.userId, taskId as string);
    if (!toUpdate) {
      res.notFound();
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
    const updated = await taskHelper.updateTaskDates(
      user.userId,
      taskId as string,
      updateObj.startDate,
      updateObj.endDate
    );
    // already checked for task existence, should not be 404
    res.json({ task: updated });
  });

export default handler;
