export type ReduxStateTypes = 'INIT' | 'PENDING' | 'ERROR' | 'SUCCESS';

export type KnownError = {
  message: string;
  description: string;
  code: number | undefined;
};

export type BaseSliceTypes<T> = {
  status: ReduxStateTypes;
  current: T;
  error: string | null;
};
