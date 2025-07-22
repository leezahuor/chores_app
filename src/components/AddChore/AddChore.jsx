import "./AddChore.css";
import { useState } from "react";

function AddChore() {
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignee, setAssignee] = useState("");

  // const addChore = async (e) => {
  //     e.preventDefault();

  //     const newChore = {
  //         name,
  //         dueDate,
  //         assignee
  //     };

  //     const response = await
  // };

  return (
    <div className="add-chore-container">
      <h2 className="add-chore-title">Add a Chore</h2>
      <form className="add-chore-card">
        <label className="add-chore-info">
          Name:
          <input className="add-chore-input" value={name} />
        </label>
        <label className="add-chore-info">
          Due:
          <input className="add-chore-input" value={dueDate} />
        </label>
        <label className="add-chore-info">
          Assignee:
          <input className="add-chore-input" value={assignee} />
        </label>
        <button className="add-chore-button">Add</button>
      </form>
    </div>
  );
}

export default AddChore;
