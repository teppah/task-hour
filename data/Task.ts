import { addHours } from "date-fns";

type Task = {
  taskId: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
};
export function createTask(
  taskId: string,
  title: string,
  description: string,
  startDate: Date,
  endDate: Date = addHours(startDate, 1)
): Task {
  return {
    taskId,
    title,
    description,
    startDate,
    endDate,
  };
}

export default Task;
