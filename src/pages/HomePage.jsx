import React, { useState } from "react";
import ChoreList from "../components/ChoreList/ChoreList";
import ChoreFilter from "../components/ChoreFilter/ChoreFilter";
import ChoreSort from "../components/ChoreSort/ChoreSort";

function HomePage({ chores, onShowModal, setChores }) {
  // Handles filters state
  const [filters, setFilters] = useState({
    assignee: "",
    date: "",
    location: "",
  });

  const [sorted, setSorted] = useState(chores);

  // Handles chore deletion
  const handleDelete = (id) => {
    setChores((prev) => prev.filter((chore) => chore.id !== id));
  };

  // Handles when chores rotate to next date and/or assignee
  const handleUpdate = (updatedChore) => {
    setChores((prev) =>
      prev.map((chore) => (chore.id === updatedChore.id ? updatedChore : chore))
    );
  };

  // Handles when filter is being used
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Handles clearing filters
  const handleClearFilters = () => {
    setFilters({ assignee: "", date: "", location: "" });
  };

  // Filters chores
  const filteredChores = sorted.filter((chore) => {
    // Filters by assignee
    const filteredAssignee =
      !filters.assignee || chore.assignee === filters.assignee;

    // Filters by due date
    const filteredDate = !filters.date || chore.dueDate === filters.date;

    // Filters by chore location
    const filteredLocation =
      !filters.location ||
      chore.location?.toLowerCase().includes(filters.location.toLowerCase());

    return filteredAssignee && filteredDate && filteredLocation;
  });

  const assignees = [...new Set(chores.map((chore) => chore.assignee))]; // Adds assignees to filter through when new assignees get added

  return (
    <div>
      <button onClick={onShowModal} data-testid="homepage-add-chore-btn">
        Add Chore
      </button>

      <ChoreSort chores={chores} onSorted={setSorted} />

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
