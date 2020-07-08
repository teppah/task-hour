import useSWR from "swr";
import fetcher from "lib/fetcher";
import Task from "lib/Task";

function useDatelessTasks() {
  const { data, error, mutate } = useSWR(`/api/tasks/dates`, fetcher);
  const withType: Task[] = data?.tasks;
  return {
    datelessTasks: withType,
    isLoading: !data && !error,
    isError: error,
    mutate,
  };
}
export default useDatelessTasks;
