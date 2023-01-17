import { createContext } from "react";

export enum Status {
  NOT_YET = "not_yet",
  IN_PROGRESS = "in_progress",
  ALL_CALCULATED = "all_calculated",
}

export interface RaceContextProps {
  status: Status;
}

export const RaceContext = createContext<RaceContextProps>(null);
