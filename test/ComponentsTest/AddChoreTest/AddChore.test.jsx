import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AddChore from "../../../src/components/AddChore/AddChore";
import React from "react";
import "@testing-library/jest-dom/vitest";

describe("AddChore", () => {
  it("Checks if AddChore is being called", async () => {
    // Create mock function for onAddChore
    const mockFunction = vi.fn();
    render(<AddChore onAddChore={mockFunction} />);

    // Set input fields using test IDs
    fireEvent.change(screen.getByTestId("input-choreName"), {
      target: { value: "Mop" },
    });
    fireEvent.change(screen.getByTestId("input-dueDate"), {
      target: { value: "2025-10-22" },
    });
    fireEvent.change(screen.getByTestId("input-assignee"), {
      target: { value: "Leeza" },
    });
    fireEvent.change(screen.getByTestId("input-frequency"), {
      target: { value: "once" },
    });
    fireEvent.change(screen.getByTestId("input-reminder"), {
      target: { value: "2025-10-29" },
    });
    fireEvent.change(screen.getByTestId("input-location"), {
      target: { value: "Kitchen" },
    });

    // Simulate clicking "Add" button
    fireEvent.click(screen.getByRole("button", { name: /Add/i }));

    // Checks if mock function was called only once
    expect(mockFunction).toHaveBeenCalledTimes(1);

    // Checks if mock function has the same data that was entered previously
    expect(mockFunction).toHaveBeenCalledWith(
      expect.objectContaining({
        choreName: "Mop",
        dueDate: "2025-10-22",
        assignee: "Leeza",
        frequency: "once",
        reminder: "2025-10-29",
        location: "Kitchen",
        id: expect.any(Number),
      })
    );
  });
});
