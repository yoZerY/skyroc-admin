export interface RequestInstanceState {
  /** the request error message stack */
  errMsgStack: string[];
  /** the promise of refreshing token */
  refreshTokenPromise: Promise<boolean> | null;
  [key: string]: unknown;
}
