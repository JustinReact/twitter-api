import { configureStore } from "@reduxjs/toolkit";
import notificationsReducer from "./features/notificationSlice";
import tweetsReducer from "./features/tweetsSlice";

export const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    tweets: tweetsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});
