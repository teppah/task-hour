import Task, { createTask } from "lib/shared/Task";
import { parseISO, isValid } from "date-fns";
import { nanoid } from "nanoid";
import createHandler from "lib/api/handler";
import taskHelper from "lib/api/task-helper";
import ServerSideUser from "lib/shared/user/ServerSideUser";
import authenticatedRoute from "lib/api/authenticated-route";

type Response = {
  task: Task;
};

const handler = createHandler<Response>();

handler
  .use(authenticatedRoute)
  .get(async (req, res) => {
    const { taskId } = req.query;
    if (!taskId) {
      res.status(400).end(`400 Missing taskId`);
      return;
    }
    const user = req.session.get<ServerSideUser>("user");
    const task = await taskHelper.getTask(user.userId, taskId as string);
    if (task) {
      res.json({ task: task });
    } else {
      res.status(404).end("404 Not Found");
    }
  })
  .post(async (req, res) => {
    const user = req.session.get<ServerSideUser>("user");
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
      userId: user.userId,
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
    const user = req.session.get<ServerSideUser>("user");
    const { taskId } = req.query;
    const { title, description, isComplete } = req.body;
    const toUpdate = await taskHelper.updateTaskStatus(
      user.userId,
      taskId as string,
      {
        title,
        description,
        isComplete,
      }
    );
    if (toUpdate) {
      res.json({ task: toUpdate });
    } else {
      res.status(404).end("404 Not Found");
    }
  })
  .delete(async (req, res) => {
    const user = req.session.get<ServerSideUser>("user");
    const { taskId } = req.query;
    if (!taskId) {
      res.status(400).end("400 Missing taskId");
      return;
    }
    const toDelete = await taskHelper.deleteTask(user.userId, taskId as string);
    if (toDelete) {
      res.json({ task: toDelete });
    } else {
      res.status(404).end("404 Not Found");
    }
  });

export default handler;
