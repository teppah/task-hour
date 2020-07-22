import { addHours } from "date-fns";

type Task = {
  taskId: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isComplete: boolean;
};
export function createTask(
  taskId: string,
  title: string,
  description: string,
  startDate: Date,
  endDate: Date = addHours(startDate, 1),
  isComplete: boolean = false
): Task {
  return {
    taskId,
    title,
    description,
    startDate,
    endDate,
    isComplete,
  };
}

export default Task;
