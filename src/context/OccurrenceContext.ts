import { createContext } from "react";
import type { OccurrenceContextType } from "./occurrenceTypes";

export const OccurrenceContext = createContext<
  OccurrenceContextType | undefined
>(undefined);
