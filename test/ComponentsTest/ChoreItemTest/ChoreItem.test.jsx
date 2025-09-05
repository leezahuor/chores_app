import React, { useState } from "react";
import "@testing-library/jest-dom/vitest";
import {
  render,
  screen,
  fireEvent,
  act,
  cleanup,
} from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import ChoreItem from "../../../src/components/ChoreItem/ChoreItem";

// Use fake timers for setTimeout logic
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(cleanup);

describe("ChoreItem", () => {
  const baseChore = {
    id: 1,
    choreName: "Mop",
    assignee: "Leeza",
    frequency: "once",
    dueDate: new Date("2025-09-01"),
    reminder: new Date("2025-09-02"),
  };

  it("renders chore details", () => {
    render(
      <ChoreItem
        chore={baseChore}
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

  it("marks chore as checked and shows Undo button", () => {
    render(
      <ChoreItem
        chore={baseChore}
        index={0}
        onDelete={() => {}}
        onUpdate={() => {}}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(screen.getByText("Undo")).toBeInTheDocument();
  });

  it("calls onDelete after timeout when frequency is once", () => {
    const mockDelete = vi.fn();
    render(
      <ChoreItem
        chore={baseChore}
        index={0}
        onDelete={mockDelete}
        onUpdate={() => {}}
      />
    );

    fireEvent.click(screen.getByRole("checkbox"));

    // advance time by 3 seconds
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(mockDelete).toHaveBeenCalledWith(baseChore.id);
  });

  it("calls onUpdate after timeout when frequency is not once", () => {
    const mockUpdate = vi.fn();
    const recurringChore = { ...baseChore, frequency: "daily" };

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

    expect(mockUpdate).toHaveBeenCalled();
    const updatedChore = mockUpdate.mock.calls[0][0];
    expect(updatedChore.assignee).not.toBe(recurringChore.assignee); // rotated assignee
    expect(new Date(updatedChore.dueDate).getTime()).not.toBe(
      new Date(recurringChore.dueDate).getTime()
    ); // new date assigned
  });

  it("cancels delete/update when Undo is clicked", () => {
    const mockDelete = vi.fn();
    const mockUpdate = vi.fn();
    render(
      <ChoreItem
        chore={baseChore}
        index={0}
        onDelete={mockDelete}
        onUpdate={mockUpdate}
      />
    );

    fireEvent.click(screen.getByRole("checkbox"));

    fireEvent.click(screen.getByText("Undo")); // cancel action

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(mockDelete).not.toHaveBeenCalled();
    expect(mockUpdate).not.toHaveBeenCalled();
  });
});
