import { Status } from "./RaceContext";

export function showStatusByKey(status: Status): string {
  switch (status) {
    case Status.ALL_CALCULATED:
      return "All calculated";
    case Status.IN_PROGRESS:
      return "In progress";
    case Status.NOT_YET:
      return "Stopped";
  }
}
