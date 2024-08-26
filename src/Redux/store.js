import { configureStore } from "@reduxjs/toolkit";
import { habitReducer } from "./Reducers/habbit.Reducers";

export const store = configureStore({
    reducer: {
        habitTracker: habitReducer,
    },
});
