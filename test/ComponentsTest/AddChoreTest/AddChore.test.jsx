import React from "react";
import { render, screen, within, fireEvent } from "@testing-library/react";
import AddChore from "../../../src/components/AddChore/AddChore";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

describe("AddChore", () => {
  it("checks if the AddChore method is being called (not updated)", async () => {
    const mockFunction = vi.fn();
    render(<AddChore onAddChore={mockFunction} />);

    const choreName = screen.getByTestId("input-choreName");
    const dueDate = screen.getByTestId("input-dueDate");
    const assignee = screen.getByTestId("input-assignee");
    const frequency = screen.getByTestId("input-frequency");
    const reminder = screen.getByTestId("input-reminder");

    await userEvent.type(choreName, "Mop");
    await userEvent.type(dueDate, "2025-10-23");
    await userEvent.type(assignee, "Leeza");
    await userEvent.type(frequency, "1");
    await userEvent.type(reminder, "2025-10-30");

    const button = screen.getByRole("button", { name: /Add/i });
    await userEvent.click(button);

    expect(mockFunction).toHaveBeenCalledTimes(1);

    expect(mockFunction).toHaveBeenCalledWith({
      choreName: "Mop",
      dueDate: "2025-10-23",
      assignee: "Leeza",
      frequency: "1",
      reminder: "2025-10-30",
    });
  });
});
