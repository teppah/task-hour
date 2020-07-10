import serverClient from "./database";
import Task from "lib/Task";
import { query as q, QueryOptions } from "faunadb";
import { title } from "process";

type ResType = {
  ref: any;
  ts: any;
  data: any;
};
const databaseHelper = {
  createTask: async (task: Task): Promise<object> => {
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
    console.log(res);
    return res;
  },
  getTask: async (taskId: string): Promise<Task> => {
    const res: ResType = await serverClient.query(
      q.Get(q.Match(q.Index("task_by_taskId"), taskId))
    );
    const task: Task = res.data;
    console.log(res);
    console.log(typeof res.ref);
    console.log(typeof res.data);
    return task;
  },
};

export default databaseHelper;
