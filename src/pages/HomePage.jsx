import React, { useEffect, useState } from "react";
import ChoreList from "../components/ChoreList/ChoreList";
import ChoreFilter from "../components/ChoreFilter/ChoreFilter";
import ChoreSort from "../components/ChoreSort/ChoreSort";
import Modal from "../components/Modal/Modal";
import { getLateChores, sortLateChoresFirst } from "../utils/ChoreUtils";

function HomePage({ chores, onShowModal, setChores }) {
  // Handles filters state
  const [filters, setFilters] = useState({
    assignee: "",
    date: "",
    location: "",
  });

  // Handles sorted state
  const [sorted, setSorted] = useState(chores || []);

  // Handles modal for late chores 
  const [showLateModal, setShowLateModal] = useState(false);

  // Updates new chores and returns an empty array if null or undefined
  useEffect(() => {
    setSorted(chores || []);
  }, [chores]);

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

  // Gets chores and flags them if they're late
  const flaggedLateChores = getLateChores(sorted);
  const reorderLateChores = sortLateChoresFirst(flaggedLateChores);
  const lateChores = flaggedLateChores.filter((chore) => chore.isLate);

  // Late chore modal pops up if late chores are present
  useEffect(() => {
    if (lateChores.length > 0) {
      setShowLateModal(true);
    }
  }, [lateChores.length]);

  // Filters chores
  const filteredChores = reorderLateChores.filter((chore) => {
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

      {/* Shows modal for late chores if there are any present to remind user to prioritize late chores */}
      {showLateModal && (
        <Modal onClose={() => setShowLateModal(false)}>
          <h2 style={{ color: "red" }}>You Have Late Chores!</h2>
          <ul>
            {lateChores.map((chore) => (
              <li key={chore.id}>
                <strong>{chore.choreName}</strong> (Due: {chore.dueDate})
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </div>
  );
}

export default HomePage;
