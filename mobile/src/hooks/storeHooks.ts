import {AnyAction, Dispatch, ThunkDispatch} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/src/rootReducer';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type Extras = {};

export type AppDispatch = ThunkDispatch<RootState, Extras, AnyAction> &
  Dispatch<AnyAction>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
