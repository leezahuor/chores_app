import React from "react";

function ChoreFilter({ filters, onChange, onClear, assignees }) {
  // Allows user to filter list by assignee, due date, or location of chore.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  return (
    <div>
      <h4>Filter Chores By:</h4>

      <div>
        <label>
          Assignee:
          <select
            name="assignee"
            value={filters.assignee}
            onChange={handleInputChange}
          >
            <option value="">All</option>
            {assignees.length > 0 ? (
              assignees.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))
            ) : (
              <option disabled>No assignees</option>
            )}
          </select>
        </label>

        <label>
          Due Date:
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Location:
          <input
            type="text"
            name="location"
            placeholder="Kitchen..."
            value={filters.location}
            onChange={handleInputChange}
          />
        </label>
      </div>

      <button onClick={onClear}>Clear Filters</button>
    </div>
  );
}

export default ChoreFilter;
