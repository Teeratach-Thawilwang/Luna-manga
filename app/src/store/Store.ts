import { configureStore } from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import backofficeReducer from "@store/BackofficeReducers";
import frontsideReducer from "@store/FrontSideReducers";

const store = configureStore({
  reducer: {
    frontside: frontsideReducer,
    backoffice: backofficeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: import.meta.env.MODE !== "production",
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispathType = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispathType>();

export default store;
