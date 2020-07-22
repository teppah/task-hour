import serverClient from "./database";
import Task from "lib/shared/Task";
import { query as q } from "faunadb";
import { parseISO, isValid } from "date-fns";
import { isNull, isUndefined, update } from "lodash";

type ResType = {
  ref: any;
  ts: any;
  data: any;
};
const taskHelper = {
  createTask: async (task: Task): Promise<Task> => {
    const restOfData = {
      userId: task.userId,
      taskId: task.taskId,
      title: task.title,
      description: task.description,
      isComplete: task.isComplete,
    };
    // shouldn't throw 404
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
  getTask: async (userId: string, taskId: string): Promise<Task> => {
    try {
      const res: ResType = await serverClient.query(
        q.Get(q.Match(q.Index("task_by_userId_and_taskId"), [userId, taskId]))
      );
      const converted = await convertTask(res.data);
      return converted;
    } catch (e) {
      if (e.requestResult?.statusCode === 404) {
        return null;
      } else {
        throw e;
      }
    }
  },
  getTasks: async (userId: string): Promise<Task[]> => {
    try {
      const res: ResType = await serverClient.query(
        q.Map(
          q.Paginate(q.Match(q.Index("tasks_by_userId"), userId)),
          q.Lambda((document) => q.Get(document))
        )
      );
      const tasks: Task[] = [];
      for (const doc of res.data) {
        const t = await convertTask(doc.data);
        tasks.push(t);
      }
      return tasks;
    } catch (e) {
      if (e.requestResult?.statusCode === 404) {
        return null;
      } else {
        throw e;
      }
    }
  },
  updateTaskStatus: async (
    userId: string,
    taskId: string,
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
    try {
      const res: ResType = await serverClient.query(
        q.Update(
          // select Ref from Get document that matches the taskId provided to index
          // https://stackoverflow.com/questions/60594689/can-i-update-a-faunadb-document-without-knowing-its-id
          q.Select(
            ["ref"],
            q.Get(
              q.Match(q.Index("task_by_userId_and_taskId"), [userId, taskId])
            )
          ),
          {
            data: {
              ...updateObj,
            },
          }
        )
      );
      const updatedTask = await convertTask(res.data);
      return updatedTask;
    } catch (e) {
      if (e.requestResult?.statusCode === 404) {
        return null;
      } else {
        throw e;
      }
    }
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
    try {
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
    } catch (e) {
      if (e.requestResult?.statusCode === 404) {
        return null;
      } else {
        throw e;
      }
    }
  },
  deleteTask: async (userId: string, taskId: string): Promise<Task> => {
    try {
      const toDelete: Task = await serverClient.query(
        q.Delete(
          q.Select(
            ["ref"],
            q.Get(
              q.Match(q.Index("task_by_userId_and_taskId"), [userId, taskId])
            )
          )
        )
      );
      return toDelete;
    } catch (e) {
      if (e.requestResult?.statusCode === 404) {
        return null;
      } else {
        throw e;
      }
    }
  },
};

async function convertTask(task): Promise<Task> {
  const start: string = await serverClient.query(q.ToString(task.startDate));
  const end: string = await serverClient.query(q.ToString(task.endDate));
  return {
    userId: task.userId,
    taskId: task.taskId,
    title: task.title,
    description: task.description,
    isComplete: task.isComplete,
    startDate: parseISO(start),
    endDate: parseISO(end),
  };
}

export default taskHelper;
