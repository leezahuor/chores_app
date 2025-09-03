import React from "react";
import ChoreList from "../components/ChoreList/ChoreList";

function HomePage({ chores, onShowModal, setChores }) {
  const handleDelete = (id) => {
    setChores((prev) => prev.filter((chore) => chore.id !== id));
  };

  const handleUpdate = (updatedChore) => {
    setChores((prev) =>
      prev.map((chore) => (chore.id === updatedChore.id ? updatedChore : chore))
    );
  };

  return (
    <div>
      <button onClick={onShowModal} data-testid="homepage-add-chore-btn">
        Add Chore
      </button>
      <ChoreList
        chores={chores}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

export default HomePage;
