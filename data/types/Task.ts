class Task {
  taskId: number;
  title: string;
  description: string;
  date: Date;
  constructor(taskId: number, title: string, description: string, date: Date) {
    this.taskId = taskId;
    this.title = title;
    this.description = description;
    this.date = date;
  }
}

export default Task;
