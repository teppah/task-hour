import Task, { createTask } from "lib/Task";
import { parseISO, isValid } from "date-fns";
import { nanoid } from "nanoid";
import createHandler from "lib/api/handler";
import taskHelper from "lib/api/task-helper";
import ServerSideUser from "lib/user/ServerSideUser";

type Response = {
  task: Task;
};

const handler = createHandler<Response>();

handler
  .get(async (req, res) => {
    const currentUser = req.session.get<ServerSideUser>("user");
    if (!currentUser) {
      res.status(403).end("403 Forbidden");
      return;
    }
    const { taskId } = req.query;
    if (!taskId) {
      res.status(400).end(`Error 400 - Missing taskId`);
      return;
    }
    try {
      const task = await taskHelper.getTask(<string>taskId);
      res.json({ task: task });
    } catch (e) {
      console.log(e);
      if (e.requestResult.statusCode === 404) {
        res.status(404).end(`404 Task Not Found`);
      } else {
        res.status(500).json(e);
      }
    }
  })
  .post(async (req, res) => {
    const { title, description, startDate, endDate, isComplete } = req.body;
    const start = parseISO(startDate);
    const end = parseISO(endDate);
    const completionStatus = isComplete === "true";
    if (!title || !description || !isValid(start) || !isValid(end)) {
      res.status(400).end(`400 Malformed Request`);
      return;
    }
    const taskId = nanoid();
    const toCreate: Task = {
      taskId,
      title,
      description,
      startDate: start,
      endDate: end,
      isComplete: completionStatus,
    };
    const createdTask = await taskHelper.createTask(toCreate);
    res.json({ task: createdTask });
  })
  .put(async (req, res) => {
    const { taskId } = req.query;
    const { title, description, isComplete } = req.body;
    try {
      const toUpdate = await taskHelper.updateTaskStatus(taskId, {
        title,
        description,
        isComplete,
      });
      res.json({ task: toUpdate });
    } catch (e) {
      console.log(JSON.stringify(e));
      if (e.requestResult.statusCode === 404) {
        res.status(404).end(`404 Task Not Found`);
      } else {
        res.status(500).json(e);
      }
    }
  })
  .delete(async (req, res) => {
    const { taskId } = req.query;
    if (!taskId) {
      res.status(400).end("400 Malformed Request - `Missing taskId`");
      return;
    }
    try {
      const toDelete = await taskHelper.deleteTask(<string>taskId);
      res.json({ task: toDelete });
    } catch (e) {
      if (e.requestResult.statusCode === 404) {
        res.status(404).end(`404 Task Not Found`);
      } else {
        res.status(500).json(e);
      }
    }
  });

export default handler;
