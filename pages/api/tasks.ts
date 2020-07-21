import Task, { createTask } from "lib/Task";
import createHandler from "lib/api/handler";
import taskHelper from "lib/api/task-helper";
import ServerSideUser from "lib/user/ServerSideUser";

type Response = {
  tasks: Task[];
};

const handler = createHandler<Response>();

handler.get(async (req, res) => {
  const currentUser = req.session.get<ServerSideUser>("user");
  if (!currentUser) {
    res.status(403).end("403 Forbidden");
    return;
  }
  try {
    const tasks = await taskHelper.getTasks();
    res.json({ tasks: tasks });
  } catch (e) {
    console.log(`ERROR`);
    console.log(e);
    res.status(500).json(e);
  }
});

export default handler;
