export type AuthFeasibilityState = {
  currentMode: "anonymous";
  proposedProvider: string;
  currentCapabilities: string[];
  observedWebBaseline: string[];
  missingInputs: string[];
  proposedPath: string[];
  futureUnlocks: string[];
};
