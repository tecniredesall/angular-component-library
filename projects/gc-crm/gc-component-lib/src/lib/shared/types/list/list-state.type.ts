export enum GCCLEListState {
  Initializing = 'initializing',
  Loading = 'loading',
  Filled = 'filled',
  Empty = 'empty',
  NoMatches = 'no-matches',
  Error = 'error',
}

export type GCCLTListState = `${GCCLEListState}`;
