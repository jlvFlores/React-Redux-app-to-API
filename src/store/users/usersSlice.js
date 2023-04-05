import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'https://randomuser.me/api/?results=5';

const initialState = {
  users: [],
  isLoading: true,
  error: undefined,
};

export const getUsers = createAsyncThunk('users/getUsers', async (userData, { rejectWithValue }) => {
  try {
    const resp = await axios.get(url);
    return resp.data.results;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    renderUsers: () => {
      
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
  }
});

export default usersSlice.reducer;
