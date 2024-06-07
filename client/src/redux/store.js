// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import userReducer from "./user/userSlice.js";
// import globalReducer from "./index/index.js";
// import { api } from "./api/api.js";
// import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const rootReducer = combineReducers({
//   user: userReducer,
//   global: globalReducer,
//   [api.reducerPath]: api.reducer,
// });

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }).concat(api.middleware),
// });

// export const persistor = persistStore(store);

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
import globalReducer from "./index/index.js";
import { api } from "./api/api.js";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

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

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
});

export const persistor = persistStore(store);
