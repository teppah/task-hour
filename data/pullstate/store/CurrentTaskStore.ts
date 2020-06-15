import { Store } from "pullstate";
import Task from "data/types/Task";

interface ICurrentTaskStore {
  currentTasks: Task[];
  selectedTask?: Task;
}

export const CurrentTaskStore = new Store<ICurrentTaskStore>({
  currentTasks: [],
  selectedTask: null,
});
