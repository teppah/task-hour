type Task = {
  taskId: number;
  title: string;
  description: string;
  date: Date;
};
export function createTask(
  taskId: number,
  title: string,
  description: string,
  date: Date
): Task {
  return {
    taskId,
    title,
    description,
    date,
  };
}

export default Task;
