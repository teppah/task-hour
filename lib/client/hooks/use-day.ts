import useSwr from "swr";
import fetcher from "lib/client/fetcher";
import Task from "lib/shared/Task";
import { isValid } from "date-fns";

type SliceReturnType = {
  [key: number]: Task;
};

function useDay(dayStart: Date) {
  const { data, error, mutate } = useSwr(
    isValid(dayStart)
      ? `/api/slices?startTime=${dayStart.toISOString()}`
      : null,
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
