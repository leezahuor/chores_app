import React from "react";

function ChoreFilter({ filters, onChange, onClear }) {
  return (
    <div>
      <select>
        <option value="">Assignees</option>
        <option value="Leeza">Leeza</option>
        <option value="Amanda">Amanda</option>
        <option value="Josh">Josh</option>
        <option value="Sesame">Sesame</option>
      </select>

      <input
        type="date"
        value={filters.date}
        onChange={(e) => onChange({ ...filters, date: e.target.value })}
      />

      <input
        type="text"
        placeholder="Filter by location"
        value={filters.location}
        onChange={(e) => onChange({ ...filters, location: e.target.value })}
      />

      <button onClick={onClear}>Clear Filters</button>
    </div>
  );
}

export default ChoreFilter;
