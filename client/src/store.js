import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./reducers/user.js";
import tutorReducer from "./reducers/tutor.js";
import detailReducer from "./reducers/tutorialDetails.js"
// import paperReducer from "./reducers/paper.js";
// import orderReducer from "./reducers/order.js";

const rootReducer = combineReducers({
  user: userReducer,
  tutor: tutorReducer,
  tutorialDetails: detailReducer
  //   paper: paperReducer,
  //   order: orderReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // To allow storage of functions and non-serializable data
    }),
});

export const persistor = persistStore(store);
