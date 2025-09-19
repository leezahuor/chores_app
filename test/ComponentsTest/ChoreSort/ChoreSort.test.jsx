import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ChoreSort from "../../../src/components/ChoreSort/ChoreSort";
import React from "react";
import "@testing-library/jest-dom/vitest";

describe("ChoreSort", () => {
  const sampleChores = [
    {
      choreName: "Vacuum",
      assignee: "Leeza",
      dueDate: "2025-09-20",
      frequency: "daily",
      location: "Living Room",
      reminder: "2025-09-19",
    },
    {
      choreName: "Dust",
      assignee: "Amanda",
      dueDate: "2025-09-18",
      frequency: "weekly",
      location: "Bedroom",
      reminder: "2025-09-17",
    },
    {
      choreName: "Mop",
      assignee: "Leeza",
      dueDate: "2025-09-19",
      frequency: "weekly",
      location: "Living Room",
      reminder: "2025-09-18",
    },
    {
      choreName: "Trash",
      assignee: "Josh",
      dueDate: "2025-09-19",
      frequency: "weekly",
      location: "Kitchen",
      reminder: "2025-09-18",
    },
  ];

  // Helper function to extract sorted list from onSorted callback
  function getSortedNames(onSorted) {
    return onSorted.mock.calls[onSorted.mock.calls.length - 1][0].map(
      (c) => c.choreName
    );
  }

  it("Sorts by each option correctly", async () => {
    const onSorted = vi.fn(); // Mocks onSorted
    render(<ChoreSort chores={sampleChores} onSorted={onSorted} />);

    const dropdown = screen.getByLabelText(/sort by/i); // Simulates drop down sort menu

    // Default - sort by dueDate ascending, then tie-break by choreName
    let names = getSortedNames(onSorted);
    expect(names).toEqual(["Dust", "Mop", "Trash", "Vacuum"]);

    // Sort by choreName
    fireEvent.change(dropdown, { target: { value: "choreName" } });
    names = getSortedNames(onSorted);
    expect(names).toEqual(["Dust", "Mop", "Trash", "Vacuum"]);

    // Sort by assignee, then tie-break by choreName
    fireEvent.change(dropdown, { target: { value: "assignee" } });
    names = getSortedNames(onSorted);
    expect(names).toEqual(["Dust", "Trash", "Mop", "Vacuum"]); // Amanda, Josh, Leeza, Leeza

    // Sort by location, then tie-break by choreName
    fireEvent.change(dropdown, { target: { value: "location" } });
    names = getSortedNames(onSorted);
    expect(names).toEqual(["Dust", "Trash", "Mop", "Vacuum"]); // Bedroom, Kitchen, Living Room, Living Room
  });

  it("Checks if can handle empty list", () => {
    const onSorted = vi.fn();
    render(<ChoreSort chores={[]} onSorted={onSorted} />);
    expect(onSorted).toHaveBeenCalledWith([]); // Returns empty array if chore list is empty
  });
});