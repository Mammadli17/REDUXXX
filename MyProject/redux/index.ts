import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "./slices/todoSlice";
import ThemeSlice from "./slices/ThemeSlice";
import favoritesSlice from "./slices/favoritesSlice";

export const store = configureStore({
  reducer: {
    todosSlice: todoReducer,
    themeSlice: ThemeSlice,
    favoritesSlice: favoritesSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type StateType = ReturnType<typeof store.getState>;
