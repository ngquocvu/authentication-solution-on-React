import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthReducer from './slices/AuthSlice';
import ProfileReducer from './slices/ProfileSlice';
import { AuthSliceTypes } from '../types';

const setInitialAuthState = () => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    return { accessToken: accessToken, isLogin: true };
  } else return { accessToken: null, isLogin: false };
};

const initialAuthState: AuthSliceTypes = {
  status: 'INIT',
  current: setInitialAuthState(),
  error: null,
};

const reducer = combineReducers({
  auth: AuthReducer,
  profile: ProfileReducer,
});

const store = configureStore({
  reducer,
  devTools: true,
  preloadedState: {
    auth: initialAuthState,
  },
});

export { store };

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type IThunkApi = {
  dispatch: AppDispatch;
  state: RootState;
};
