import serverClient from "./database";
import Task from "lib/Task";
import { query as q } from "faunadb";
import { parseISO, isValid } from "date-fns";
import { isNull, isUndefined, update } from "lodash";

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
  updateTaskStatus: async (
    taskId,
    {
      title,
      description,
      isComplete,
    }: { title?: string; description?: string; isComplete?: boolean }
  ): Promise<Task> => {
    const updateObj: any = {};
    title && (updateObj.title = title);
    description && (updateObj.description = description);
    !isNull(isComplete) &&
      !isUndefined(isComplete) &&
      (updateObj.isComplete = isComplete);
    const res: ResType = await serverClient.query(
      q.Update(
        // select Ref from Get document that matches the taskId provided to index
        // https://stackoverflow.com/questions/60594689/can-i-update-a-faunadb-document-without-knowing-its-id
        q.Select(["ref"], q.Get(q.Match(q.Index("task_by_taskId"), taskId))),
        {
          data: {
            ...updateObj,
          },
        }
      )
    );
    const updatedTask = await convertTask(res.data);
    return updatedTask;
  },
  updateTaskDates: async (
    taskId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Task> => {
    const newStart = isValid(startDate)
      ? q.Time(startDate.toISOString())
      : "no date";
    const newEnd = isValid(startDate)
      ? q.Time(endDate.toISOString())
      : "no date";
    const res: ResType = await serverClient.query(
      q.Update(
        q.Select(["ref"], q.Get(q.Match(q.Index("task_by_taskId"), taskId))),
        {
          data: {
            startDate: newStart,
            endDate: newEnd,
          },
        }
      )
    );
    const updatedTask = await convertTask(res.data);
    return updatedTask;
  },
  deleteTask: async (taskId: string): Promise<Task> => {
    const toDelete: Task = await serverClient.query(
      q.Delete(
        q.Select(["ref"], q.Get(q.Match(q.Index("task_by_taskId"), taskId)))
      )
    );
    return toDelete;
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
