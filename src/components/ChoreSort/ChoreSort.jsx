import { useEffect, useState } from "react";

function ChoreSort({ chores, onSorted }) {
  const [sorted, setSorted] = useState("dueDate");

  useEffect(() => {
    if (!chores || chores.length === 0) {
      onSorted([]);
      return;
    }

    let sortedChores = [...chores];

    switch (sorted) {
      case "dueDate":
        sortedChores.sort((a, b) => {
          const dateA = a.dueDate || "";
          const dateB = b.dueDate || "";
          if (dateA === dateB) {
            return a.choreName.localeCompare(b.choreName);
          }
          return dateA.localeCompare(dateB);
        });
        break;

      case "name":
        sortedChores.sort((a, b) =>
          (a.choreName || "").localeCompare(b.choreName || "")
        );
        break;

      case "assignee":
        sortedChores.sort((a, b) =>
          (a.assignee || "").localeCompare(b.assignee || "")
        );
        break;

      case "location":
        sortedChores.sort((a, b) =>
          (a.location || "").localeCompare(b.location || "")
        );
        break;

      default:
        break;
    }

    console.log(
      `Sorting by: ${sorted}`,
      sortedChores.map((c) => `${c.dueDate} - ${c.choreName}`)
    );

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
        <option value="name">Chore Name</option>
        <option value="assignee">Assignee</option>
        <option value="location">Location</option>
      </select>
    </div>
  );
}

export default ChoreSort;
