import useSwr from "swr";
import fetcher from "lib/fetcher";
import Task from "lib/Task";
import { isValid } from "date-fns";

type SliceReturnType = {
  [key: number]: Task;
};

function useDay(dayStart: Date) {
  const isoDate = isValid(dayStart) ? dayStart.toISOString() : "invalid_date";
  const { data, error, mutate } = useSwr(
    `/api/slices?startTime=${isoDate}`,
    fetcher
  );
  const withType: SliceReturnType = data;
  return {
    slices: withType,
    isLoading: !error && !data,
    isError: error,
    mutateDay: mutate,
  };
}

export default useDay;
