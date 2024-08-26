import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  HabitSelector,
  toggelHabit,
} from "../../Redux/Reducers/habbit.Reducers";
import { ImHappy } from "react-icons/im";
import { FaSadCry } from "react-icons/fa";
import styles from "./habitdetails.module.css";

export function WeeklyHabits() {
  // Select habits from Redux store
  const habits = useSelector(HabitSelector);
  const dispatch = useDispatch();

  // Dispatch action to toggle habit status
  const toggleStatus = (habitIndex, day) => {
    dispatch(toggelHabit({ habitIndex, day }));
  };

  // Generate previous 7 days' dates and day names
  const getPreviousDates = () => {
    const currentDate = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const previousDates = [];
    for (let i = 6; i >= 0; i--) {
      const prevDate = new Date(currentDate);
      prevDate.setDate(currentDate.getDate() - i);
      const dayOfWeek = days[prevDate.getDay()];
      const date = prevDate.getDate();
      const month = prevDate.getMonth() + 1;
      previousDates.push({ dayOfWeek, date, month });
    }
    return previousDates;
  };

  const countTrueDays = (habits) => {
    // Get the status object of the habit
    const status = habits.status;
    // Count the number of days marked as true
    return Object.values(status).filter((day) => day).length;
  };

  const previousDates = getPreviousDates();

  return (
    <div className={styles.container}>
      {/* Header for weekly habits progress */}
      <h4>Weekly Habits Progress:😻</h4>
      {/* Table displaying habits and their status for the past week */}
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th className="bg-success text-green">Habit</th>
            {previousDates.map((date, index) => (
              <th className="bg-secondary text-white" key={index}>
                {date.dayOfWeek} - {date.date}/{date.month}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {habits.map((habit, habitIndex) => (
            <tr key={habitIndex}>
              <td className="bg-info">
                <h2>{habit.name}</h2>
                <h5>{`${countTrueDays(habit)}/7 Days Completed`}</h5>
                <small>{habit.description}</small>
              </td>
              {Object.keys(habit.status).map((day) => (
                <td
                  key={day}
                  className="text-center bg-dark"
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleStatus(habitIndex, day)}
                >
                  {habit.status[day] ? (
                    <ImHappy
                      className="text-success"
                      title="Mark undone"
                      size={40}
                    />
                  ) : (
                    <FaSadCry
                      className="text-danger"
                      title="Mark Done"
                      size={40}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
