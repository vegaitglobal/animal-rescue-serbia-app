import {AnyAction, Dispatch, ThunkDispatch} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {IApiClient, IAuthManager} from '../infrastructure/types';
import {RootState} from '../store/src/rootReducer';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type Extras = {
  authManager: IAuthManager;
  apiClient: IApiClient;
};

export type AppThunkApiConfig<TRejectedValue = unknown> = {
  state: RootState;
  dispatch: AppDispatch;
  extra: Extras;
  rejectValue: TRejectedValue;
};

export type AppDispatch = ThunkDispatch<RootState, Extras, AnyAction> &
  Dispatch<AnyAction>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
