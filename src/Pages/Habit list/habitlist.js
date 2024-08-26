import { useSelector, useDispatch } from "react-redux";
import {
  HabitSelector,
  AddHabit,
  DeleteHabit,
  editHabit,
} from "../../Redux/Reducers/habbit.Reducers";
import { useState } from "react";
import Styles from "./habitlist.module.css";
import { NavLink } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";

export function HabbitList() {
  // State to manage habit name and description for editing or adding
  const [updateHabit, setEditHabit] = useState({ name: "", description: "" });
  // State to track the index of the habit being edited
  const [editIndex, setEditIndex] = useState(null);

  // Retrieve habits from Redux store
  const habits = useSelector(HabitSelector);
  const dispatch = useDispatch();

  // Set habit details for editing
  const updatetheHabit = (habit, index) => {
    setEditHabit(habit);
    setEditIndex(index); // Set index for the habit being edited
  };

  // Handle form submission for adding or updating habits
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if habit name is not empty
    if (!updateHabit.name.trim()) {
      alert("Habit name cannot be empty");
      return;
    }

    // Dispatch action to either update an existing habit or add a new one
    if (editIndex !== null) {
      // If editing, update the habit
      dispatch(editHabit({ index: editIndex, habit: updateHabit }));
    } else {
      // If adding, add a new habit with default status
      dispatch(
        AddHabit({
          ...updateHabit,
          status: {
            Monday: false,
            Tuesday: false,
            Wednesday: false,
            Thursday: false,
            Friday: false,
            Saturday: false,
            Sunday: false,
          },
        })
      );
    }

    // Reset form fields and editing index
    setEditHabit({ name: "", description: "" });
    setEditIndex(null);
  };

  // Function to count the number of days marked as true for a specific habit
  const countTrueDays = (habits) => {
    // Get the status object of the habit
    const status = habits.status;
    // Count the number of days marked as true
    return Object.values(status).filter((day) => day).length;
  };

  return (
    <div className={Styles.main}>
      {/* Header for the habit tracker */}
      <strong>
        <h3 className="text-success">Habit Tracker</h3>
      </strong>
      {/* Form header based on whether a habit is being edited or added */}
      <h4>{editIndex !== null ? "Edit Habit" : "Add New Habit"}</h4>
      {/* Form for adding or updating habits */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control p-2"
            placeholder="Enter habit name"
            value={updateHabit.name}
            onChange={(e) =>
              setEditHabit({ ...updateHabit, name: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter habit description"
            value={updateHabit.description}
            onChange={(e) =>
              setEditHabit({ ...updateHabit, description: e.target.value })
            }
          />
        </div>
        <button type="submit" className="btn btn-primary p-2">
          {editIndex !== null ? "Update Habit" : "Add Habit"}
        </button>
      </form>
      {/* Table displaying list of habits */}
      <table className="table m-1">
        <thead className="bg-info">
          <tr>
            <th>Index</th>
            <th>Habit</th>
            <th>Description</th>
            <th> Completion status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {habits.map((habit, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <h4>
                  <strong>{habit.name}</strong>
                </h4>
              </td>
              <td>{habit.description}</td>
              <td>{`${countTrueDays(habit)}/7 Days`}</td>
              <td>
                {/* Edit button */}
                <button
                  className="btn btn-primary me-2 rounded-5"
                  onClick={() => updatetheHabit(habit, index)}
                >
                  <FaEdit size={30} />
                </button>
                {/* Delete button */}
                <button
                  className="btn btn-danger rounded-5"
                  onClick={() => dispatch(DeleteHabit(index))}
                >
                  <MdDelete size={30} />
                </button>
                {/* Navigation button to weekly list */}
                <NavLink to="/WeekList">
                  <button className="btn btn-info me-3 br-5 p-2 rounded-5">
                    <GiProgression size={30} />
                  </button>
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
