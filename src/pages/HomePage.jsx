import React, { useState } from "react";
import ChoreList from "../components/ChoreList/ChoreList";
import ChoreFilter from "../components/ChoreFilter/ChoreFilter";

function HomePage({ chores, onShowModal, setChores }) {
  const [filters, setFilters] = useState({
    assignee: "",
    date: "",
    location: "",
  });

  const handleDelete = (id) => {
    setChores((prev) => prev.filter((chore) => chore.id !== id));
  };

  const handleUpdate = (updatedChore) => {
    setChores((prev) =>
      prev.map((chore) => (chore.id === updatedChore.id ? updatedChore : chore))
    );
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({ assignee: "", date: "", location: "" });
  };

  const filteredChores = chores.filter((chore) => {
    const filteredAssignee =
      !filters.assignee || chore.assignee === filters.assignee;

    const filteredDate =
      !filters.date ||
      new Date(chore.dueDate).toDateString() ===
        new Date(filters.date).toDateString();

    const filteredLocation =
      !filters.location ||
      chore.location?.toLowerCase().includes(filters.location.toLowerCase());

    return filteredAssignee && filteredDate && filteredLocation;
  });

  const assignees = [...new Set(chores.map((chore) => chore.assignee))];

  return (
    <div>
      <button onClick={onShowModal} data-testid="homepage-add-chore-btn">
        Add Chore
      </button>

      <ChoreFilter
        filters={filters}
        onChange={handleFilterChange}
        onClear={handleClearFilters}
        assignees={assignees}
      />

      <ChoreList
        chores={filteredChores}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

export default HomePage;
