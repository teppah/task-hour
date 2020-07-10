import serverClient from "./database";
import Task from "lib/Task";
import { query as q } from "faunadb";
import { parseISO } from "date-fns";

type ResType = {
  ref: any;
  ts: any;
  data: any;
};
const databaseHelper = {
  createTask: async (task: Task): Promise<Task> => {
    const restOfData = {
      taskId: task.taskId,
      title: task.title,
      description: task.description,
      isComplete: task.isComplete,
    };
    const res: ResType = await serverClient.query(
      q.Create(q.Collection("tasks"), {
        data: {
          startDate: q.Time(task.startDate.toISOString()),
          endDate: q.Time(task.endDate.toISOString()),
          ...restOfData,
        },
      })
    );
    const converted = await convertTask(res.data);
    return converted;
  },
  getTask: async (taskId: string): Promise<Task> => {
    const res: ResType = await serverClient.query(
      q.Get(q.Match(q.Index("task_by_taskId"), taskId))
    );
    const converted = await convertTask(res.data);
    return converted;
  },
  getTasks: async (): Promise<Task[]> => {
    const res: ResType = await serverClient.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection("tasks"))),
        q.Lambda((document) => q.Get(document))
      )
    );
    const tasks: Task[] = [];
    for (const doc of res.data) {
      const t = await convertTask(doc.data);
      tasks.push(t);
    }
    return tasks;
  },
};

async function convertTask(task): Promise<Task> {
  const start: string = await serverClient.query(q.ToString(task.startDate));
  const end: string = await serverClient.query(q.ToString(task.endDate));
  return {
    taskId: task.taskId,
    title: task.title,
    description: task.description,
    isComplete: task.isComplete,
    startDate: parseISO(start),
    endDate: parseISO(end),
  };
}

export default databaseHelper;
