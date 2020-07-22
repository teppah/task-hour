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
import ServerSideUser from "lib/shared/user/ServerSideUser";
import authenticatedRoute from "lib/api/authenticated-route";

/**
 * Finds all tasks within day
 * startTime: ISO time string
 */
const handler = createHandler();
handler.use(authenticatedRoute).get(async (req, res) => {
  const { startTime } = req.query;
  const start = parseISO(startTime as string);
  const end = addDays(start, 1);
  const user = req.session.get<ServerSideUser>("user");
  if (!isValid(start)) {
    res.status(400).end(`400 Invalid Time Format(s)`);
    return;
  }
  const tasks = await taskHelper.getTasks(user.userId);
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
