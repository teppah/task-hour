import {
  isValid,
  parseISO,
  isWithinInterval,
  addHours,
  isSameHour,
  addDays,
} from "date-fns";
import { range } from "lodash";
import createHandler from "lib/api/handler";
import taskHelper from "lib/api/task-helper";
import ServerSideUser from "lib/user/ServerSideUser";

/**
 * Finds all tasks within day
 * startTime: ISO time string
 */
const handler = createHandler();
handler.get(async (req, res) => {
  const currentUser = req.session.get<ServerSideUser>("user");
  if (!currentUser) {
    res.status(403).end("403 Forbidden");
    return;
  }
  const { startTime } = req.query;
  const start = parseISO(<string>startTime);
  const end = addDays(start, 1);
  if (!isValid(start)) {
    res.status(400).end(`Error 400 - Missing or invalid ISO time format(s)`);
    return;
  }
  const tasks = await taskHelper.getTasks();
  const filteredTasks = tasks.filter((t) =>
    isWithinInterval(t.startDate, { start: start, end: end })
  );
  const timeMap = {};
  // assume each slice is 1h
  range(24).map((i) => {
    const currentHour = addHours(start, i);
    // for now, assume only one task is within the hour
    const found = filteredTasks.find((t) =>
      isSameHour(currentHour, t.startDate)
    );
    if (found) {
    }
    timeMap[i] = found;
  });
  // will not send slices where there is nothing;
  // let client check whether the response includes the timeslice
  res.json(timeMap);
});

export default handler;
