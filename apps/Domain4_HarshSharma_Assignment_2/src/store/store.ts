import { api } from "@/services/api";
import { googleApi } from "@/services/googleApi";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [googleApi.reducerPath]: googleApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(googleApi.middleware),
});

setupListeners(store.dispatch);
