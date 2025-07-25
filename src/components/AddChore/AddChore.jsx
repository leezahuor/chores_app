import "./AddChore.css";
import { useState } from "react";

function AddChore({ onAddChore }) {
  const [chore, setChore] = useState({
    choreName: "",
    dueDate: "",
    assignee: "",
  });

  const submitButton = (e) => {
    e.preventDefault();
    onAddChore({ ...chore });

    setChore({
      choreName: "",
      dueDate: "",
      assignee: "",
    });
  };

  return (
    <div className="add-chore-container">
      <h2 className="add-chore-title">Add a Chore</h2>
      <form className="add-chore-card" onSubmit={submitButton}>
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
        <button className="add-chore-button" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddChore;
