import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { afterEach, describe, it, expect, vi } from "vitest";
import ChoreFilter from "../../../src/components/ChoreFilter/ChoreFilter";
import React from "react";
import "@testing-library/jest-dom/vitest";

// Clears DOM after each test
afterEach(cleanup);

describe("ChoreFilter", () => {
  const mockOnChange = vi.fn(); // Create mock for onChange
  const mockOnClear = vi.fn(); // Create mock for onClear

  const defaultFilters = {
    assignee: "",
    date: "",
    location: "",
  }; // Sets up default for filters

  const assignees = ["Leeza", "Amanda", "Josh"]; // Mock pool of assignees to filter through

  it("Checks if all filter fields render properly", () => {
    render(
      <ChoreFilter
        filters={defaultFilters}
        onChange={mockOnChange}
        onClear={mockOnClear}
        assignees={assignees}
      />
    );

    expect(screen.getByLabelText(/Assignee/i)).toBeInTheDocument();
    assignees.forEach((a) => {
      expect(screen.getByRole("option", { name: a })).toBeInTheDocument();
    });

    expect(screen.getByLabelText(/Due Date/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/Kitchen/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Clear Filters/i })
    ).toBeInTheDocument();
  });

  it("Checks if onChange is called when selecting an assignee to filter with", () => {
    render(
      <ChoreFilter
        filters={defaultFilters}
        onChange={mockOnChange}
        onClear={mockOnClear}
        assignees={assignees}
      />
    );

    const select = screen.getByLabelText(/Assignee/i);
    fireEvent.change(select, { target: { value: "Amanda" } });

    expect(mockOnChange).toHaveBeenCalledWith({
      ...defaultFilters,
      assignee: "Amanda",
    });
  });

  it("Checks if onChange is called when entering a location", () => {
    render(
      <ChoreFilter
        filters={defaultFilters}
        onChange={mockOnChange}
        onClear={mockOnClear}
        assignees={assignees}
      />
    );

    const input = screen.getByPlaceholderText(/Kitchen/i);
    fireEvent.change(input, { target: { value: "Kitchen" } });

    expect(mockOnChange).toHaveBeenCalledWith({
      ...defaultFilters,
      location: "Kitchen",
    });
  });

  it("Checks if onClear is called when clicking on clear filters button", () => {
    render(
      <ChoreFilter
        filters={defaultFilters}
        onChange={mockOnChange}
        onClear={mockOnClear}
        assignees={assignees}
      />
    );

    const clearButton = screen.getByRole("button", { name: /Clear Filters/i });
    fireEvent.click(clearButton);

    expect(mockOnClear).toHaveBeenCalledTimes(1);
  });
});
