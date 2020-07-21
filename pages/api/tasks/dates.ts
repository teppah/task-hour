import { parseISO, isValid } from "date-fns";
import createHandler from "lib/api/handler";
import taskHelper from "lib/api/task-helper";
import ServerSideUser from "lib/user/ServerSideUser";

type Response = {
  tasks: string[];
};

const handler = createHandler<Response>();

handler
  // get all tasks with empty start dates here
  // only return taskIds
  .get(async (req, res) => {
    const currentUser = req.session.get<ServerSideUser>("user");
    if (!currentUser) {
      res.status(403).end("403 Forbidden");
      return;
    }

    const tasks = await taskHelper.getTasks();
    const filtered = tasks
      .filter((t) => !isValid(t.startDate))
      .map((t) => t.taskId);
    res.json({ tasks: filtered });
  });

export default handler;
