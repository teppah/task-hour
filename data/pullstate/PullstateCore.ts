import { TaskStore } from "./store/TaskStore";
import { DateStore } from "./store/DateStore";
import { CurrentTaskStore } from "./store/CurrentTaskStore";
import { createPullstateCore } from "pullstate";

export const PullstateCore = createPullstateCore({
  TaskStore,
  DateStore,
  CurrentTaskStore,
});
