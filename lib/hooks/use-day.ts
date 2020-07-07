import useSwr from "swr";
import fetcher from "lib/fetcher";
import Task from "lib/Task";

type SliceReturnType = {
  [key: number]: Task;
};

function useDay(dayStart: Date) {
  const isoDate = dayStart.toISOString();
  const { data, error } = useSwr(`/api/slices?startTime=${isoDate}`, fetcher);
  const withType: SliceReturnType = data;
  return {
    slices: withType,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useDay;
