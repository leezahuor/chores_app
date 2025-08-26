import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AddChore from "../../../src/components/AddChore/AddChore";
import React from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

describe("AddChore", () => {
  it("Checks if the AddChore method is being called", async () => {
    // Create mock function for onAddChore
    const mockFunction = vi.fn();
    render(<AddChore onAddChore={mockFunction} />);

    // Set input fields using test IDs
    const choreName = screen.getByTestId("input-choreName");
    const dueDate = screen.getByTestId("input-dueDate");
    const assignee = screen.getByTestId("input-assignee");
    const frequency = screen.getByTestId("input-frequency");
    const reminder = screen.getByTestId("input-reminder");

    // Simulate user typing into each field
    await userEvent.type(choreName, "Mop");
    await userEvent.type(dueDate, "2025-10-23");
    await userEvent.type(assignee, "Leeza");
    await userEvent.type(frequency, "1");
    await userEvent.type(reminder, "2025-10-30");

    // Find and simulate clicking "Add" button
    const button = screen.getByRole("button", { name: /Add/i });
    await userEvent.click(button);

    // Checks if mock function was called only once
    expect(mockFunction).toHaveBeenCalledTimes(1);

    // Checks if mock function has the same data that was entered previously
    expect(mockFunction).toHaveBeenCalledWith({
      choreName: "Mop",
      dueDate: "2025-10-23",
      assignee: "Leeza",
      frequency: "1",
      reminder: "2025-10-30",
    });
  });
});
