import { useContext } from "react";
import { OccurrenceContext } from "./OccurrenceContext";

export function useOccurrence() {
  const context = useContext(OccurrenceContext);
  if (!context) {
    throw new Error("useOccurrence must be used within an OccurrenceProvider");
  }
  return context;
}
