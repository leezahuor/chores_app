import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HomePage from "../../../src/pages/HomePage";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

describe("HomePage", () => {
  it("renders Add Chore button", () => {
    render(<HomePage chores={[]} onShowModal={() => {}} />);
    expect(
      screen.getByRole("button", { name: /add chore/i })
    ).toBeInTheDocument();
  });

  it("calls onShowModal when Add Chore is clicked", () => {
    const mockOnShowModal = vi.fn();
    render(<HomePage chores={[]} onShowModal={mockOnShowModal} />);
    fireEvent.click(screen.getByTestId("homepage-add-chore-btn"));
    expect(mockOnShowModal).toHaveBeenCalledTimes(1);
  });

  it("renders chore items from list", () => {
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
