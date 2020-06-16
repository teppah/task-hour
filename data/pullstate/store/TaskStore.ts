import { Store } from "pullstate";
import Task from "data/Task";

interface ITaskStore {
  tasks: Task[];
}

export const TaskStore = new Store<ITaskStore>({
  tasks: tempTasks,
});
