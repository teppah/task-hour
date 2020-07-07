import useSwr from "swr";
import fetcher from "lib/fetcher";
import Task from "lib/Task";

type TaskReturnType = {};

function useTask(taskId: string) {
  const { data, error } = useSwr(`/api/task?taskId=${taskId}`, fetcher);
  const withType: Task = data?.task;
  return {
    task: withType,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useTask;
