import { combineReducers } from '@reduxjs/toolkit';
import { weatherSlice } from './slices/weather.slice';

export const rootReducer = combineReducers({
  [weatherSlice.name]: weatherSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
