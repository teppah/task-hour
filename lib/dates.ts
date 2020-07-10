export function getDayName(dayId: number) {
  switch (dayId) {
    case 0:
      return "sunday";
    case 1:
      return "monday";
    case 2:
      return "tuesday";
    case 3:
      return "wednesday";
    case 4:
      return "thursday";
    case 5:
      return "friday";
    case 6:
      return "saturday";
  }
}

export enum VIEWS {
  FULL_WEEK = "fullweek",
  WORK_WEEK = "workweek",
}

export function getDaysFromView(view: VIEWS) {
  switch (view) {
    case VIEWS.FULL_WEEK:
      return [0, 1, 2, 3, 4, 5, 6];
    case VIEWS.WORK_WEEK:
      return [1, 2, 3, 4, 5];
  }
}
