export function getDayName(dayId: number) {
  switch (dayId) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
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
