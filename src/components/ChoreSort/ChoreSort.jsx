import { useEffect, useState } from "react";
import React from "react";

function ChoreSort({ chores, onSorted }) {
  const [sorted, setSorted] = useState("dueDate");

  // General sort function to sort chores by name, due date, assignee, and location 
  // via a dropdown menu
  function sortChores(a, b, columnId) {
    let valA = a[columnId] || "";
    let valB = b[columnId] || "";

    if (typeof valA === "string" && typeof valB === "string") {
      if (columnId === "dueDate") {
        valA = new Date(valA);
        valB = new Date(valB);
      } else {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }
    }

    if (valA > valB) return 1;
    if (valA < valB) return -1;

    // If already on choreName, stop recursion
    if (columnId === "choreName") return 0;

    // If there is a tie-breaker, sort by choreName
    return sortChores(a, b, "choreName");
  }

  useEffect(() => {
    if (!chores || chores.length === 0) {
      onSorted([]);
      return;
    }

    const sortedChores = [...chores].sort((a, b) => sortChores(a, b, sorted));
    onSorted(sortedChores);
  }, [chores, sorted, onSorted]);

  return (
    <div>
      <label htmlFor="sort">Sort By:</label>
      <select
        id="sort"
        value={sorted}
        onChange={(e) => setSorted(e.target.value)}
      >
        <option value="dueDate">Due Date</option>
        <option value="choreName">Chore Name</option>
        <option value="assignee">Assignee</option>
        <option value="location">Location</option>
      </select>
    </div>
  );
}

export default ChoreSort;