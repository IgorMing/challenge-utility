import { createContext, Dispatch, SetStateAction } from "react";

export enum RacerStatus {
  NOT_YET = "not_yet",
  IN_PROGRESS = "in_progress",
  CALCULATED = "calculated",
}

export enum GeneralStatus {
  NOT_YET = "not_yet",
  IN_PROGRESS = "in_progress",
  ALL_CALCULATED = "all_calculated",
}

export type RacersState = Map<string, RacerStateDetails>;

export interface RacerStateDetails {
  status: RacerStatus;
  winLikelihood?: number;
}
export interface RaceContextProps {
  status: GeneralStatus;
  setRacers: Dispatch<SetStateAction<RacersState>>;
  racersMap: RacersState;
}

export const RaceContext = createContext<RaceContextProps>(null);
