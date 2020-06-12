import { Store } from "pullstate";
import Task from "data/types/Task";

interface ITaskStore {
  tasks: Task[];
}

const tempTasks: Task[] = [
  {
    title: "Task 1",
    description: "Description 1",
    taskId: 0,
  },
  {
    title: "Task 2",
    description: "Description 2",
    taskId: 1,
  },
  {
    title: "Task 3",
    description: "Description 3",
    taskId: 2,
  },
  {
    title: "Task 4",
    description: "Description 4",
    taskId: 3,
  },
  {
    title: "Task 5",
    description: "Description 5",
    taskId: 4,
  },
];

export const TaskStore = new Store<ITaskStore>({
  tasks: tempTasks,
});
