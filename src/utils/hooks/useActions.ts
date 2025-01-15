import {
  type ActionCreatorsMapObject,
  type AsyncThunk,
  bindActionCreators,
  type Dispatch,
} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { AppDispatch } from '../../store/store.ts';

export const useActions = <T extends ActionCreatorsMapObject>(
  actions: T
): BoundActions<T> => {
  const dispatch = useDispatch<AppDispatch>();

  return useMemo(() => bindActionCreators(actions, dispatch), [actions, dispatch]);
};

type BoundActions<T extends ActionCreatorsMapObject> = {
  [key in keyof T]: T[key] extends AsyncThunk<unknown, void, AsyncThunkConfig>
    ? BoundAsyncThunk<T[key]>
    : T[key];
};

type BoundAsyncThunk<
  TypeThunk extends AsyncThunk<unknown, void, AsyncThunkConfig>
> = (...args: Parameters<TypeThunk>) => ReturnType<ReturnType<TypeThunk>>;

type AsyncThunkConfig = {
  state?: unknown;
  dispatch?: Dispatch;
  extra?: unknown;
  rejectValue?: unknown;
  serializeErrorType?: unknown;
  pendingMeta?: unknown;
  fulFilledMeta?: unknown;
  rejectedMeta?: unknown;
};
