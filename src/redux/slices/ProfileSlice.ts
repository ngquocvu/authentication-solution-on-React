import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { KnownError, ProfileSliceTypes, ProfileTypes } from '../../types';
import { AxiosError } from 'axios';
import { ProfileServices } from '../../services/ProfileServices';

const initialState: ProfileSliceTypes = {
  status: 'INIT',
  error: '',
  current: {
    name: '',
    email: '',
    website: '',
    createAt: null,
    updateAt: null,
  },
};

export const getCurrentProfile = createAsyncThunk<
  ProfileTypes,
  undefined,
  { rejectValue: KnownError }
>('profile/me', async (_, thunkAPI) => {
  try {
    const { data } = await ProfileServices.getCurrentProfile();
    return {
      name: data.name,
      email: data.email,
      website: data.website.name,
      createAt: data.createAt,
      updateAt: data.updateAt,
    };
  } catch (err) {
    const error: AxiosError<KnownError> = err as any;
    if (!error.response) {
      throw err;
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const ProfileSlice = createSlice({
  name: 'ProfileSlice',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getCurrentProfile.pending, (state) => ({
      ...state,
      status: 'PENDING',
      error: null,
    }));
    builder.addCase(getCurrentProfile.rejected, (state, action) => ({
      ...state,
      status: 'ERROR',
      error: action.payload?.message || null,
    }));
    builder.addCase(getCurrentProfile.fulfilled, (state, action) => ({
      ...state,
      status: 'SUCCESS',
      error: null,
      current: {
        name: action.payload.name,
        email: action.payload.email,
        website: action.payload.website,
        createAt: action.payload.createAt,
        updateAt: action.payload.updateAt,
      },
    }));
  },
});

const { reducer: ProfileReducer } = ProfileSlice;
export default ProfileReducer;
