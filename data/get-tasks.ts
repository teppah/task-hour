import { set, subWeeks, subDays } from "date-fns";
import { nanoid } from "nanoid";
import Task, { createTask } from "./Task";
const now = new Date();
const task1 = createTask(
  nanoid(),
  "Task 1",
  "Description 1",
  set(now, { hours: 22 })
);
const task2 = createTask(
  nanoid(),
  "Task 2",
  "Description 2",
  set(now, { hours: 10 })
);
const task3 = createTask(
  nanoid(),
  "Last Week 1",
  "Description 3",
  subWeeks(now, 1)
);
const task4 = createTask(
  nanoid(),
  "Yesterday task 1",
  "Description 4",
  subDays(now, 1)
);
const task5 = createTask(
  nanoid(),
  "Yesterday task 2",
  "Description 5",
  subDays(set(now, { hours: 6 }), 1)
);
const tempTasks: Task[] = [task1, task2, task3, task4, task5];

export default function getTasks() {
  return tempTasks;
}
