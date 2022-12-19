import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { teamsSlice } from './slices/teamsSlice';

export const store = configureStore({
    reducer: {
        teams: teamsSlice.reducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
