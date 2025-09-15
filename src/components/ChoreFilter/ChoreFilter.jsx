import React from "react";

function ChoreFilter({ filters, onChange, onClear, assignees }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  return (
    <div className="chore-filter">
      <h3>Filter Chores</h3>

      <div className="filter-group">
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
            placeholder="Kitchen, Bathroom..."
            value={filters.location}
            onChange={handleInputChange}
          />
        </label>
      </div>

      <button className="clear-btn" onClick={onClear}>
        Clear Filters
      </button>
    </div>
  );
}

export default ChoreFilter;
