import React from "react";
import "./AddChore.css";
import { useState } from "react";

function AddChore({ onAddChore }) {
  const [chore, setChore] = useState({
    choreName: "",
    dueDate: "",
    assignee: "",
    frequency: "",
    reminder: "",
  });

  const submitButton = (e) => {
    e.preventDefault();
    onAddChore({ ...chore });

    setChore({
      choreName: "",
      dueDate: "",
      assignee: "",
      frequency: "",
      reminder: "",
    });
  };

  return (
    <div>
      <h2>Add a Chore</h2>
      <form className="add-chore-card add-chore-scroll" onSubmit={submitButton}>
        <label htmlFor="name" className="add-chore-info">
          Name:
          <input
            className="add-chore-input"
            data-testid="input-choreName"
            id="name"
            type="text"
            placeholder="Chore Name"
            value={chore.choreName}
            onChange={(e) => {
              setChore({ ...chore, choreName: e.target.value });
            }}
          />
        </label>
        <label htmlFor="dueDate" className="add-chore-info">
          Due:
          <input
            className="add-chore-input"
            data-testid="input-dueDate"
            id="dueDate"
            type="date"
            value={chore.dueDate}
            onChange={(e) => {
              setChore({ ...chore, dueDate: e.target.value });
            }}
          />
        </label>
        <label htmlFor="assignee" className="add-chore-info">
          Assignee:
          <input
            className="add-chore-input"
            data-testid="input-assignee"
            id="assignee"
            type="text"
            placeholder="Assignee"
            value={chore.assignee}
            onChange={(e) => {
              setChore({ ...chore, assignee: e.target.value });
            }}
          />
        </label>
        <label htmlFor="frequency" className="add-chore-info">
          Frequency:
          <input
            className="add-chore-input"
            data-testid="input-frequency"
            id="frequency"
            type="number"
            value={chore.frequency}
            onChange={(e) => {
              setChore({ ...chore, frequency: e.target.value });
            }}
          />
        </label>
        <label htmlFor="reminder" className="add-chore-info">
          Reminder:
          <input
            className="add-chore-input"
            data-testid="input-reminder"
            id="reminder"
            type="date"
            value={chore.reminder}
            onChange={(e) => {
              setChore({ ...chore, reminder: e.target.value });
            }}
          />
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddChore;
