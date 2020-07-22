import { addHours } from "date-fns";

type Task = {
  userId: string;
  taskId: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isComplete: boolean;
};
export function createTask(
  userId: string,
  taskId: string,
  title: string,
  description: string,
  startDate: Date,
  endDate: Date = addHours(startDate, 1),
  isComplete: boolean = false
): Task {
  return {
    userId,
    taskId,
    title,
    description,
    startDate,
    endDate,
    isComplete,
  };
}

export default Task;
