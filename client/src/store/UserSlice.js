import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    sessionStart: (state) => {
      state.loading = true;
    },
    sessionSucess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    sessionFail: (state, action) => {
      state.loading = false;
      state.currentUser = null;
      state.error = action.payload;
    },
    sessionOut: () => {
      initialState;
    },
  },
});

export const { sessionStart, sessionSucess, sessionOut, sessionFail } =
  userSlice.actions;

export default userSlice.reducer;
