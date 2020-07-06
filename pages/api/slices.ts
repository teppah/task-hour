import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import {
  isValid,
  parseISO,
  isWithinInterval,
  compareAsc,
  addHours,
  isSameHour,
  addDays,
} from "date-fns";
import getTasks from "data/get-tasks";
import { range } from "lodash";

/**
 * Finds all tasks within day (for now, specify endTime)
 * startTime: ISO time string
 */
const handler = nc<NextApiRequest, NextApiResponse>().get((req, res) => {
  const { startTime } = req.query;
  const start = parseISO(<string>startTime);
  const end = addDays(start, 1);
  if (!isValid(start) || !isValid(end)) {
    res
      .status(400)
      .end(
        `Error 400 - Missing or invalid ISO time format(s): startTime=${startTime}`
      );
    return;
  }
  const tasks = getTasks()
    .filter((t) => isWithinInterval(t.startDate, { start: start, end: end }))
    .sort((t1, t2) => compareAsc(t1.startDate, t1.endDate));
  const timeMap = {};
  // assume each slice is 1h
  range(24).map((i) => {
    const currentHour = addHours(start, i);
    // for now, assume only one task is within the hour
    const found = tasks.find((t) => isSameHour(currentHour, t.startDate));
    if (found) {
      tasks.shift();
    }
    timeMap[i] = found;
  });
  // will not send slices where there is nothing;
  // let client check whether the response includes the timeslice
  res.json(timeMap);
});

export default handler;
