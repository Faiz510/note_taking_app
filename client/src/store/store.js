import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ user: UserSlice });

const configStore = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(configStore, rootReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
});

export const persistor = persistStore(store);
