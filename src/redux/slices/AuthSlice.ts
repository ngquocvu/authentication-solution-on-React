import { AxiosError } from 'axios';
import AuthServices from '../../services/AuthServices';
import { AuthSliceTypes, KnownError, LoginPayload } from '../../types';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setLocalAccessToken } from '../../utils/token';

type accessTokenTypes = {
  accessToken: string;
};

type AuthTypes = {
  accessToken: string | null;
  isLogin: boolean;
};

const initialState: AuthSliceTypes = {
  status: 'INIT',
  current: {
    accessToken: null,
    isLogin: false,
  },
  error: null,
};
console.log(localStorage.getItem('accessToken'));

export const login = createAsyncThunk<
  accessTokenTypes,
  LoginPayload,
  { rejectValue: KnownError }
>('auth/login', async ({ password, email }, thunkAPI) => {
  try {
    const { data } = await AuthServices.login({ email, password });
    setLocalAccessToken(data.accessToken);
    return { accessToken: data.accessToken };
  } catch (err) {
    const error: AxiosError<KnownError> = err as any;
    if (!error.response) {
      throw err;
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk<
  undefined,
  undefined,
  { rejectValue: KnownError }
>('auth/logout', async (_, thunkAPI) => {
  try {
    await AuthServices.logout();
  } catch (err) {
    const error: AxiosError<KnownError> = err as any;
    if (!error.response) {
      throw err;
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialState,
  reducers: {
    updateAccessToken(state, action: PayloadAction<AuthTypes>) {
      state.error = null;
      state.status = 'SUCCESS';
      state.current = {
        accessToken: action.payload.accessToken,
        isLogin: action.payload.isLogin,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(login.pending, (state) => ({
      ...state,
      status: 'PENDING',
      current: { accessToken: null, isLogin: false },
      error: null,
    }));
    builder.addCase(login.rejected, (state, action) => ({
      ...state,
      status: 'ERROR',
      current: { accessToken: null, isLogin: false },
      error: action.payload?.message || null,
    }));
    builder.addCase(login.fulfilled, (state, action) => ({
      ...state,
      status: 'SUCCESS',
      error: null,
      current: { accessToken: action.payload.accessToken, isLogin: true },
    }));
    builder.addCase(logout.pending, (state) => ({
      ...state,
      status: 'PENDING',
      error: null,
    }));
    builder.addCase(logout.rejected, (state, action) => ({
      ...state,
      status: 'ERROR',
      error: action.payload?.message || null,
    }));
    builder.addCase(logout.fulfilled, (state) => ({
      ...state,
      status: 'SUCCESS',
      error: null,
      current: { accessToken: null, isLogin: false },
    }));
  },
});
const { reducer: AuthReducer } = authSlice;

export const { updateAccessToken } = authSlice.actions;
export default AuthReducer;
