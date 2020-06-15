import { Store } from "pullstate";
import Task from "data/types/Task";
import { set, subWeeks, subDays } from "date-fns";

interface ITaskStore {
  tasks: Task[];
}

const now = new Date();
const task1 = new Task(0, "Task 1", "Description 1", set(now, { hours: 22 }));
const task2 = new Task(1, "Task 2", "Description 2", set(now, { hours: 10 }));
const task3 = new Task(2, "Title 3", "Description 3", subWeeks(now, 1));
const task4 = new Task(3, "Yesterday task 1", "Description 4", subDays(now, 1));
const task5 = new Task(
  4,
  "Yesterday task 2",
  "Description 5",
  subDays(set(now, { hours: 6 }), 1)
);
const tempTasks: Task[] = [task1, task2, task3, task4, task5];

export const TaskStore = new Store<ITaskStore>({
  tasks: tempTasks,
});
