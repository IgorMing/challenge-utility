import { createContext } from "react";
import { Racer } from "../__generated__/graphql";

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
  status?: RacerStatus;
  winLikelihood?: number;
}

export type CompleteRacer = RacerStateDetails & Racer;

export interface RaceContextProps {
  status: GeneralStatus;
}

export const RaceContext = createContext<RaceContextProps>(null);
