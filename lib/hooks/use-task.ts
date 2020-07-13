import useSwr from "swr";
import fetcher from "lib/fetcher";
import Task from "lib/Task";
import { parseISO } from "date-fns";

type TaskReturnType = {};

function useTask(taskId: string) {
  const { data, error, mutate } = useSwr(`/api/task?taskId=${taskId}`, fetcher);
  const task = data?.task;
  const toReturn: Task = {
    taskId: task?.taskId,
    title: task?.title,
    description: task?.description,
    // JSON.parse() already converts it to a boolean
    isComplete: task?.isComplete,
    startDate: parseISO(task?.startDate),
    endDate: parseISO(task?.endDate),
  };
  return {
    task: data ? toReturn : null,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export default useTask;
