import Task, { createTask } from "lib/shared/Task";
import createHandler from "lib/api/handler";
import taskHelper from "lib/api/task-helper";
import ServerSideUser from "lib/shared/user/ServerSideUser";
import authenticatedRoute from "lib/api/authenticated-route";

type Response = {
  tasks: Task[];
};

const handler = createHandler<Response>();

handler.use(authenticatedRoute).get(async (req, res) => {
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
