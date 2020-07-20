import { parseISO, isValid } from "date-fns";
import createHandler from "lib/api/handler";
import taskHelper from "lib/api/task-helper";

type Response = {
  tasks: string[];
};

const handler = createHandler<Response>();

handler
  // get all tasks with empty start dates here
  // only return taskIds
  .get(async (req, res) => {
    const tasks = await taskHelper.getTasks();
    const filtered = tasks
      .filter((t) => !isValid(t.startDate))
      .map((t) => t.taskId);
    res.json({ tasks: filtered });
  });

export default handler;
