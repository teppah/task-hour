import { parseISO, isValid } from "date-fns";
import createHandler from "lib/api/handler";
import taskHelper from "lib/api/task-helper";
import ServerSideUser from "lib/shared/user/ServerSideUser";
import authenticatedRoute from "lib/api/authenticated-route";

type Response = {
  tasks: string[];
};

const handler = createHandler<Response>();

handler
  .use(authenticatedRoute)
  // get all tasks with empty start dates here
  // only return taskIds
  .get(async (req, res) => {
    const user = req.session.get<ServerSideUser>("user");
    const tasks = await taskHelper.getTasks(user.userId);
    const filtered = tasks
      .filter((t) => !isValid(t.startDate))
      .map((t) => t.taskId);
    res.json({ tasks: filtered });
  });

export default handler;
