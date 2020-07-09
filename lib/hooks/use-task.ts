import useSwr from "swr";
import fetcher from "lib/fetcher";
import Task from "lib/Task";
import { parseISO } from "date-fns";
import { isDate } from "lodash";

type TaskReturnType = {};

function useTask(taskId: string) {
  const { data, error, mutate } = useSwr(`/api/task?taskId=${taskId}`, fetcher);
  const task = data?.task;
  const withType: Task = task;
  data && console.log(data);
  data &&
    !isDate(task?.startDate) &&
    (withType.startDate = parseISO(task.startDate));
  data && !isDate(task?.endDate) && (withType.endDate = parseISO(task.endDate));
  data && console.log(withType);
  return {
    task: withType,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export default useTask;
