import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../store';
import { RootState } from '../store/reducer';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const createAppAsyncThunk: ReturnType<
  typeof createAsyncThunk.withTypes
> = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
  extra: { s: string; n: number };
}>();
