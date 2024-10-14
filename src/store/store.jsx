import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducers/movieSlice";
import TvReducer from "./reducers/TvSlice";
import PersonReducer from "./reducers/personSlice";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    Tv: TvReducer,
    person: PersonReducer,
  },
});
