import { RacerStatus } from "./types";

export function showStatusByKey(status: RacerStatus): string {
  switch (status) {
    case RacerStatus.CALCULATED:
      return "Finished";
    case RacerStatus.IN_PROGRESS:
      return "Running...";
    case RacerStatus.NOT_YET:
      return "Stopped";
  }
}

export function formatOdds(value: number): string {
  value *= 100;
  return value.toFixed(1);
}
