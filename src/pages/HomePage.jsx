import React from "react";
import ChoreList from "../components/ChoreList/ChoreList";

function HomePage({ chores, onShowModal }) {
  return (
    <div>
      <button onClick={onShowModal} data-testid="add-chore-btn">
        Add Chore
      </button>
      <ChoreList chores={chores} />
    </div>
  );
}

export default HomePage;
