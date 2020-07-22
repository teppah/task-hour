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
  const user = req.session.get<ServerSideUser>("user");
  const tasks = await taskHelper.getTasks(user.userId);
  // tasks should not be be 404 since route is cookie-authed
  res.json({ tasks: tasks });
});

export default handler;
