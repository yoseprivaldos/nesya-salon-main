import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./user/userSlice";
import globalReducer from "./index/index";
import { api } from "./api/api";
// import { apiStats } from "./api/apiStats.js";

const rootReducer = combineReducers({
  user: userReducer,
  global: globalReducer,
  [api.reducerPath]: api.reducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Redux store with persisted reducer and additional middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
});

export const persistor = persistStore(store);

export default { store, persistor };
