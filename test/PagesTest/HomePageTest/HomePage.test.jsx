import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { afterEach, describe, it, expect, vi } from "vitest";
import HomePage from "../../../src/pages/HomePage";
import React from "react";
import "@testing-library/jest-dom/vitest";

// Clears DOM after each test
afterEach(cleanup);

describe("HomePage", () => {
  it("Checks if Add Chore button is being rendered", () => {
    render(<HomePage chores={[]} onShowModal={() => {}} />);
    expect(
      screen.getByRole("button", { name: /add chore/i })
    ).toBeInTheDocument();
  });

  it("Checks if Add Chore modal is being rendered when Add Chore is clicked", () => {
    const mockOnShowModal = vi.fn();
    render(<HomePage chores={[]} onShowModal={mockOnShowModal} />);
    fireEvent.click(screen.getByTestId("homepage-add-chore-btn"));
    expect(mockOnShowModal).toHaveBeenCalledTimes(1);
  });

  it("Checks if chore items from list is being rendered", () => {
    const sampleChores = [
      {
        choreName: "Mop",
        dueDate: "10/23/2025",
        assignee: "Leeza",
        frequency: "1",
        reminder: "10/30/2025",
      },
    ];
    render(<HomePage chores={sampleChores} onShowModal={() => {}} />);

    expect(screen.getByText("Mop")).toBeInTheDocument();
    expect(screen.getByText(/Leeza/i)).toBeInTheDocument();
    expect(screen.getByTestId("chore-due-date")).toHaveTextContent(
      "10/23/2025"
    );
  });
});
