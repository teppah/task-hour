import { TaskStore } from "./store/TaskStore";
import { createPullstateCore } from "pullstate";

export const PullstateCore = createPullstateCore({ TaskStore });
