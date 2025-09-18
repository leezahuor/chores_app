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

// import {
//   render,
//   screen,
//   fireEvent,
//   waitFor,
//   act,
// } from "@testing-library/react";
// import { describe, it, expect, vi } from "vitest";
// import ChoreSort from "../../../src/components/ChoreSort/ChoreSort";
// import React from "react";

// describe("ChoreSort", () => {
//   const sampleChores = [
//     {
//       choreName: "Trash",
//       dueDate: "2025-09-21",
//       assignee: "Leeza",
//       location: "Kitchen",
//     },
//     {
//       choreName: "Mop",
//       dueDate: "2025-11-23",
//       assignee: "Amanda",
//       location: "Hallway",
//     },
//     {
//       choreName: "Vacuum",
//       dueDate: "2025-11-25",
//       assignee: "Amanda",
//       location: "Living Room",
//     },
//     {
//       choreName: "Dust",
//       dueDate: "2025-11-23",
//       assignee: "Leeza",
//       location: "Bedroom",
//     },
//   ];

//   it("sorts chores by dueDate by default", () => {
//     const onSorted = vi.fn();
//     render(<ChoreSort chores={sampleChores} onSorted={onSorted} />);

//     expect(onSorted).toHaveBeenCalledTimes(1);
//     const sortedChores = onSorted.mock.calls[0][0];
//     const dueDates = sortedChores.map((c) => c.dueDate);

//     expect(dueDates).toEqual([
//       "2025-09-21",
//       "2025-11-23",
//       "2025-11-23",
//       "2025-11-25",
//     ]);
//   });

//   it("sorts chores by choreName alphabetically when selected", async () => {
//     const onSorted = vi.fn();
//     render(<ChoreSort chores={sampleChores} onSorted={onSorted} />);
//     const dropdown = screen.getByLabelText(/sort by/i);

//     // Make sure the first call is captured
//     expect(onSorted).toHaveBeenCalledTimes(1);

//     // Trigger state change
//     await act(async () => {
//       fireEvent.change(dropdown, { target: { value: "choreName" } });
//     });

//     // Wait until the mock call count increments to 2
//     await waitFor(() => {
//       expect(onSorted).toHaveBeenCalledTimes(2);
//     });

//     const sortedChores = onSorted.mock.calls[1][0];
//     const names = sortedChores.map((c) => c.choreName);

//     expect(names).toEqual(["Dust", "Mop", "Trash", "Vacuum"]);
//   });

//   it("sorts chores by assignee alphabetically when selected", async () => {
//     const onSorted = vi.fn();
//     render(<ChoreSort chores={sampleChores} onSorted={onSorted} />);
//     const dropdown = screen.getByLabelText(/sort by/i);

//     await act(async () => {
//       fireEvent.change(dropdown, { target: { value: "assignee" } });
//     });

//     await waitFor(() => expect(onSorted).toHaveBeenCalledTimes(2));

//     const sortedChores = onSorted.mock.calls[1][0];
//     const assignees = sortedChores.map((c) => c.assignee);

//     expect(assignees).toEqual(["Amanda", "Amanda", "Leeza", "Leeza"]);
//   });

//   it("sorts chores by location alphabetically when selected", async () => {
//     const onSorted = vi.fn();
//     render(<ChoreSort chores={sampleChores} onSorted={onSorted} />);
//     const dropdown = screen.getByLabelText(/sort by/i);

//     await act(async () => {
//       fireEvent.change(dropdown, { target: { value: "location" } });
//     });

//     await waitFor(() => expect(onSorted).toHaveBeenCalledTimes(2));

//     const sortedChores = onSorted.mock.calls[1][0];
//     const locations = sortedChores.map((c) => c.location);

//     expect(locations).toEqual(["Bedroom", "Hallway", "Kitchen", "Living Room"]);
//   });

//   it("uses choreName as a tie-breaker when two dueDates are the same", () => {
//     const onSorted = vi.fn();
//     const choresWithSameDate = [
//       { choreName: "Zebra", dueDate: "2025-10-10" },
//       { choreName: "Apple", dueDate: "2025-10-10" },
//     ];

//     render(<ChoreSort chores={choresWithSameDate} onSorted={onSorted} />);
//     const sortedChores = onSorted.mock.calls[0][0];

//     expect(sortedChores.map((c) => c.choreName)).toEqual(["Apple", "Zebra"]);
//   });

//   it("calls onSorted([]) if no chores are provided", () => {
//     const onSorted = vi.fn();
//     render(<ChoreSort chores={[]} onSorted={onSorted} />);
//     expect(onSorted).toHaveBeenCalledWith([]);
//   });
// });

// import {
//   render,
//   screen,
//   fireEvent,
//   act,
//   waitFor,
// } from "@testing-library/react";
// import { describe, it, expect, vi } from "vitest";
// import ChoreSort from "../../../src/components/ChoreSort/ChoreSort";
// import React from "react";
// import "@testing-library/jest-dom/vitest";

// describe("ChoreSort", () => {
//   const sampleChores = [
//     {
//       choreName: "Mop",
//       dueDate: "2025-11-23",
//       assignee: "Leeza",
//       location: "Living Room",
//       id: 1,
//     },
//     {
//       choreName: "Vacuum",
//       dueDate: "2025-11-25",
//       assignee: "Amanda",
//       location: "Living Room",
//       id: 2,
//     },
//     {
//       choreName: "Trash",
//       dueDate: "2025-09-21",
//       assignee: "Amanda",
//       location: "Kitchen",
//       id: 3,
//     },
//   ];

//   it("sorts chores by dueDate by default", () => {
//     const onSorted = vi.fn();
//     render(<ChoreSort chores={sampleChores} onSorted={onSorted} />);

//     const firstCall = onSorted.mock.calls[0][0];
//     const dueDates = firstCall.map((c) => c.dueDate);

//     expect(dueDates).toEqual(["2025-09-21", "2025-11-23", "2025-11-25"]);
//   });

//   it("sorts chores alphabetically when choreName is selected", async () => {
//     const onSorted = vi.fn();
//     render(<ChoreSort chores={sampleChores} onSorted={onSorted} />);

//     const dropdown = screen.getByLabelText(/sort by/i);

//     fireEvent.change(dropdown, { target: { value: "name" } });

//     await waitFor(() => {
//       const lastCall = onSorted.mock.calls.at(-1)[0];
//       const names = lastCall.map((c) => c.choreName);
//       expect(names).toHaveTextContent(["Mop", "Trash", "Vacuum"]);
//     });
//   });

//   it("sorts chores by assignee when selected", async () => {
//     const onSorted = vi.fn();
//     render(<ChoreSort chores={sampleChores} onSorted={onSorted} />);

//     const dropdown = screen.getByLabelText(/sort by/i);

//     await act(async () => {
//       fireEvent.change(dropdown, { target: { value: "assignee" } });
//     });

//     const lastCall = onSorted.mock.calls.at(-1)[0];
//     const assignees = lastCall.map((c) => c.assignee);
//     expect(assignees).toEqual(["Amanda", "Amanda", "Leeza"]);

//     // Ensure tie-breaking by choreName
//     const names = lastCall.map((c) => c.choreName);
//     expect(names).toEqual(["Trash", "Vacuum", "Mop"]);
//   });

//   it("sorts chores by location when selected", async () => {
//     const onSorted = vi.fn();
//     render(<ChoreSort chores={sampleChores} onSorted={onSorted} />);

//     const dropdown = screen.getByLabelText(/sort by/i);

//     await act(async () => {
//       fireEvent.change(dropdown, { target: { value: "location" } });
//     });

//     const lastCall = onSorted.mock.calls.at(-1)[0];
//     const locations = lastCall.map((c) => c.location);
//     expect(locations).toEqual(["Kitchen", "Living Room", "Living Room"]);
//   });
// });
