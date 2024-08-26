import { createSlice } from "@reduxjs/toolkit";

// Initial state with a predefined list of habits
const initialState = {
  habits: [
    {
      name: "Gym",
      description: "Gym at 7 AM",
      status: {
        Sunday: true,
        Monday: false,
        Tuesday: false,
        Wednesday: true,
        Thursday: false,
        Friday: true,
        Saturday: false,
      },
    },
    {
      name: "Dinner",
      description: "9 PM daily",
      status: {
        Sunday: false,
        Monday: true,
        Tuesday: true,
        Wednesday: false,
        Thursday: true,
        Friday: true,
        Saturday: false,
      },
    },
    {
      name: "Coding",
      description: "Solve Daily problem in LeetCode",
      status: {
        Sunday: true,
        Monday: true,
        Tuesday: true,
        Wednesday: true,
        Thursday: true,
        Friday: true,
        Saturday: true,
      },
    },
  ],
};

// Create a slice of the Redux store for habit tracking
const habitSlice = createSlice({
  name: "habitTracker",
  initialState,
  reducers: {
    // Reducer to add a new habit to the list
    AddHabit: (state, action) => {
      state.habits.push(action.payload);
    },
    // Reducer to delete a habit by index
    DeleteHabit: (state, action) => {
      state.habits = state.habits.filter((_, i) => i !== action.payload);
    },
    // Reducer to edit an existing habit by index
    editHabit: (state, action) => {
      const { index, habit } = action.payload;
      state.habits[index] = habit;
    },
    // Reducer to toggle the status of a habit for a specific day
    toggelHabit: (state, action) => {
      const { habitIndex, day } = action.payload;
      const habit = state.habits[habitIndex];
      habit.status[day] = !habit.status[day];
    },
  },
});

// Export the reducer function for the slice
export const habitReducer = habitSlice.reducer;
// Export action creators
export const { AddHabit, DeleteHabit, editHabit, toggelHabit } =
  habitSlice.actions;
// Selector to get the habits from the state
export const HabitSelector = (state) => state.habitTracker.habits;
