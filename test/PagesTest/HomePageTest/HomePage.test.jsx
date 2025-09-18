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
        location: "Kitchen",
        id: 1,
      },
    ];
    render(<HomePage chores={sampleChores} onShowModal={() => {}} />);

    expect(screen.getByText("Mop")).toBeInTheDocument();
    expect(screen.getByText(/Assigned to:\s*Leeza/i)).toBeInTheDocument();
    expect(screen.getByTestId("chore-due-date")).toHaveTextContent(
      "10/23/2025"
    );
  });

  it("Filters chores by assignee", () => {
    const sampleChores = [
      {
        choreName: "Mop",
        dueDate: "10/23/2025",
        assignee: "Leeza",
        frequency: "weekly",
        reminder: "10/30/2025",
        location: "Kitchen",
        id: 1,
      },
      {
        choreName: "Vacuum",
        dueDate: "10/25/2025",
        assignee: "Amanda",
        frequency: "daily",
        reminder: "10/28/2025",
        location: "Living Room",
        id: 2,
      },
    ];
    render(
      <HomePage
        chores={sampleChores}
        onShowModal={() => {}}
        setChores={() => {}}
      />
    );

    fireEvent.change(screen.getByLabelText(/Assignee/i), {
      target: { value: "Amanda" },
    });

    expect(screen.getByText("Vacuum")).toBeInTheDocument();
    expect(screen.queryByText("Mop")).not.toBeInTheDocument();
  });

  it("Clears filter and shows all chores again", () => {
    const sampleChores = [
      {
        choreName: "Mop",
        dueDate: "10/23/2025",
        assignee: "Leeza",
        frequency: "weekly",
        reminder: "10/30/2025",
        location: "Kitchen",
        id: 1,
      },
      {
        choreName: "Vacuum",
        dueDate: "10/25/2025",
        assignee: "Amanda",
        frequency: "daily",
        reminder: "10/28/2025",
        location: "Living Room",
        id: 2,
      },
    ];
    render(
      <HomePage
        chores={sampleChores}
        onShowModal={() => {}}
        setChores={() => {}}
      />
    );

    fireEvent.change(screen.getByLabelText(/Assignee/i), {
      target: { value: "Amanda" },
    });

    fireEvent.click(screen.getByRole("button", { name: /clear filters/i }));

    expect(screen.getByText("Mop")).toBeInTheDocument();
    expect(screen.getByText("Vacuum")).toBeInTheDocument();
  });
});

it("Renders ChoreSort with all sorting options", () => {
  const sampleChores = [
    {
      choreName: "Mop",
      dueDate: "10/23/2025",
      assignee: "Leeza",
      frequency: "weekly",
      reminder: "10/30/2025",
      location: "Kitchen",
      id: 1,
    },
    {
      choreName: "Vacuum",
      dueDate: "10/25/2025",
      assignee: "Amanda",
      frequency: "daily",
      reminder: "10/28/2025",
      location: "Living Room",
      id: 2,
    },
  ];

  render(
    <HomePage
      chores={sampleChores}
      onShowModal={() => {}}
      setChores={() => {}}
    />
  );

  const sortSelect = screen.getByLabelText(/Sort By:/i);
  expect(sortSelect).toBeInTheDocument();

  // Check all expected sort options are present
  expect(screen.getByRole("option", { name: /Due Date/i })).toBeInTheDocument();
  expect(
    screen.getByRole("option", { name: /Chore Name/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("option", { name: /Assignee/i })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: /Location/i })).toBeInTheDocument();
});

it("Sorts list with whatever sort method is selected", () => {
  const sampleChores = [
    {
      choreName: "Mop",
      dueDate: "10/23/2025",
      assignee: "Leeza",
      frequency: "weekly",
      reminder: "10/30/2025",
      location: "Kitchen",
      id: 1,
    },
    {
      choreName: "Vacuum",
      dueDate: "10/25/2025",
      assignee: "Amanda",
      frequency: "daily",
      reminder: "10/28/2025",
      location: "Living Room",
      id: 2,
    },
  ];

  const mockSetChores = vi.fn();
  render(
    <HomePage
      chores={sampleChores}
      onShowModal={() => {}}
      setChores={mockSetChores}
    />
  );

  // Select a criteria to sort from
  const sortSelect = screen.getByLabelText(/Sort By:/i);
  fireEvent.change(sortSelect, { target: { value: "choreName" } });

  // Chore list should sort via criteria mentioned previously
  const choreRows = screen.getAllByTestId(/chore-item-\d+/);
  expect(choreRows[0]).toHaveTextContent(/Mop|Vacuum/);
});
