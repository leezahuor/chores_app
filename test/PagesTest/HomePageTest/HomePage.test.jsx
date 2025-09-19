import {
  cleanup,
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
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

it("Sorts chores and filters", () => {
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
    {
      choreName: "Trash",
      dueDate: "10/30/2025",
      assignee: "Josh",
      frequency: "weekly",
      reminder: "10/29/2025",
      location: "Kitchen",
      id: 3,
    },
  ];

  render(
    <HomePage
      chores={sampleChores}
      onShowModal={() => {}}
      setChores={() => {}}
    />
  );

  fireEvent.change(screen.getByLabelText(/Sort By:/i), {
    target: { value: "choreName" },
  });

  const choreRows = screen.getAllByTestId(/chore-item-\d+/);
  expect(choreRows[0]).toHaveTextContent("Mop");
  expect(choreRows[1]).toHaveTextContent("Trash");
  expect(choreRows[2]).toHaveTextContent("Vacuum");

  fireEvent.change(screen.getByLabelText(/Location/i), {
    target: { value: "Kitchen" },
  });

  const filteredChores = screen.getAllByTestId(/chore-item-\d+/);
  expect(filteredChores).toHaveLength(2);
  expect(filteredChores[0]).toHaveTextContent("Mop");
  expect(filteredChores[1]).toHaveTextContent("Trash");
});

it("Displays late chore modal", async () => {
  const chores = [
    {
      id: "1",
      choreName: "Mop",
      assignee: "Leeza",
      dueDate: "2020-01-01", // Late
      frequency: "weekly",
      reminder: "2020-01-02",
      location: "Kitchen",
    },
    {
      id: "2",
      choreName: "Vacuum",
      assignee: "Amanda",
      dueDate: "2099-01-01", // Not late
      frequency: "daily",
      reminder: "2099-01-02",
      location: "Living Room",
    },
  ];

  const setChores = vi.fn();
  const onShowModal = vi.fn();

  render(
    <HomePage chores={chores} setChores={setChores} onShowModal={onShowModal} />
  );

  const modal = await screen.findByRole("dialog");
  const modalText = within(modal).getByText(/Mop/i);
  expect(modalText).toBeInTheDocument();
  expect(within(modal).queryByText(/Vacuum/i)).not.toBeInTheDocument();

  const closeButton = within(modal).getByTestId("modal-close-button");
  fireEvent.click(closeButton);

  await waitFor(() => {
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

it("Reorders late chores to top of list", () => {
  const sampleChores = [
    {
      choreName: "Mop",
      dueDate: "2025-01-23", // Late
      assignee: "Leeza",
      frequency: "weekly",
      reminder: "2025-01-22",
      location: "Kitchen",
      id: 1,
    },
    {
      choreName: "Vacuum",
      dueDate: "2099-10-25", // Not Late
      assignee: "Amanda",
      frequency: "daily",
      reminder: "2099-10-28",
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

  const choreItems = screen.getAllByTestId(/chore-item-/);
  expect(choreItems[0]).toHaveTextContent("Mop");
});

it("Highlights late chores in red", () => {
  const sampleChores = [
    {
      choreName: "Mop",
      dueDate: "2025-01-23", // Late
      assignee: "Leeza",
      frequency: "weekly",
      reminder: "2025-01-22",
      location: "Kitchen",
      id: 1,
    },
  ];

  render(
    <HomePage
      chores={sampleChores}
      onShowModal={() => {}}
      setChores={() => {}}
    />
  );

  const lateChoreCard = screen.getByTestId("chore-item-0");
  expect(lateChoreCard).toHaveClass("late-chore");
});
