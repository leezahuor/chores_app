import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  act,
  cleanup,
} from "@testing-library/react";
import ChoreItem from "../../../src/components/ChoreItem/ChoreItem";
import React, { useState } from "react";
import "@testing-library/jest-dom/vitest";

// Use fake timer for setTimeout
beforeEach(() => {
  vi.useFakeTimers();
});

// Clears DOM after each test
afterEach(cleanup);

describe("ChoreItem", () => {
  // Create sample chore to use for testing scenarios
  const sampleChore = {
    id: 1,
    choreName: "Mop",
    assignee: "Leeza",
    frequency: "once",
    dueDate: "2025-09-01",
    reminder: "2025-09-02",
  };

  it("Checks if chore info is being rendered", () => {
    render(
      <ChoreItem
        chore={sampleChore}
        index={0}
        onDelete={() => {}}
        onUpdate={() => {}}
      />
    );

    expect(screen.getByText("Mop")).toBeInTheDocument();
    expect(screen.getByText(/Assigned to: Leeza/)).toBeInTheDocument();
    expect(screen.getByText(/Frequency: once/)).toBeInTheDocument();
    expect(screen.getByTestId("chore-due-date")).toHaveTextContent("Due:");
  });

  it("Checks the checkbox and checks if undo button appears", () => {
    render(
      <ChoreItem
        chore={sampleChore}
        index={0}
        onDelete={() => {}}
        onUpdate={() => {}}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox); // Simulates checkbox check

    expect(checkbox).toBeChecked(); // Expect checkbox is checked
    expect(screen.getByText("Undo")).toBeInTheDocument(); // Expect undo button appears
  });

  it("Checks if onDelete is called when timer reaches end and frequency is once", () => {
    const mockDelete = vi.fn(); // Mocks onDelete
    render(
      <ChoreItem
        chore={sampleChore}
        index={0}
        onDelete={mockDelete}
        onUpdate={() => {}}
      />
    );

    fireEvent.click(screen.getByRole("checkbox"));

    // Advances timer by 3 seconds
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(mockDelete).toHaveBeenCalledWith(sampleChore.id); // Expect onDelete to have been called
  });

  it("Checks if onUpdate is called when timer reaches end and frequency is not once", () => {
    const mockUpdate = vi.fn(); // Mocks onUpdate
    const recurringChore = {
      ...sampleChore,
      frequency: "daily",
      assignee: "Leeza",
    }; // Sets frequency to daily and assigns an assignee

    render(
      <ChoreItem
        chore={recurringChore}
        index={0}
        onDelete={() => {}}
        onUpdate={mockUpdate}
      />
    );

    fireEvent.click(screen.getByRole("checkbox"));

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(mockUpdate).toHaveBeenCalled(); // Expects onUpdate to have been called
    const updatedChore = mockUpdate.mock.calls[0][0];

    expect(updatedChore.assignee).toBe("Amanda"); // Expects assignee to rotate to next person in list

    // Checks due date increments by 1 day
    const originalDate = new Date(recurringChore.dueDate);
    const expectedDate = new Date(originalDate);
    expectedDate.setDate(originalDate.getDate() + 1);
    expect(new Date(updatedChore.dueDate).toDateString()).toBe(
      expectedDate.toDateString()
    );
  });

  it("Checks if undo cancels action", () => {
    const mockDelete = vi.fn();
    const mockUpdate = vi.fn();
    render(
      <ChoreItem
        chore={sampleChore}
        index={0}
        onDelete={mockDelete}
        onUpdate={mockUpdate}
      />
    );

    fireEvent.click(screen.getByRole("checkbox"));

    fireEvent.click(screen.getByText("Undo")); // Undoes checking the checkbox

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(mockDelete).not.toHaveBeenCalled();
    expect(mockUpdate).not.toHaveBeenCalled();

    expect(screen.getByText("Mop")).toBeInTheDocument();
    expect(screen.getByText(/Assigned to: Leeza/)).toBeInTheDocument();
    expect(screen.getByText(/Frequency: once/)).toBeInTheDocument();
    expect(screen.getByTestId("chore-due-date")).toHaveTextContent("Due:");
  });
});
