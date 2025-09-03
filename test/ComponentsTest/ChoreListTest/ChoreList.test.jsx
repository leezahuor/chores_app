import { describe, it, expect, afterEach, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import * as C from "../../../src/components/ChoreList/ChoreListConstants";
import ChoreList from "../../../src/components/ChoreList/ChoreList";
import React, { useState } from "react";
import "@testing-library/jest-dom/vitest";

afterEach(cleanup);

describe("ChoreList", () => {
  it("Checks if empty message displays when chore list is empty", async () => {
    render(<ChoreList chores={[]} />);
    const emptyMessage = screen.getByText(C.CHORE_LIST_EMPTY_MSG);
    // Expect empy chore list message to appear when list is empty
    expect(emptyMessage).toBeInTheDocument();
  });

  it("Checks if sample chores are being displayed", async () => {
    // Make sample chores list to pass to chores prop
    const sampleChores = [
      {
        choreName: "Mop",
        dueDate: "10/23/2025",
        assignee: "Leeza",
        frequency: "1",
        reminder: "10/30/2025",
      },
      {
        choreName: "Vacuum",
        dueDate: "10/30/2025",
        assignee: "Amanda",
        frequency: "1",
        reminder: "11/06/2025",
      },
    ];

    render(<ChoreList chores={sampleChores} />);
    const list = screen.getAllByTestId("chore-list");

    // Checks if each item is in the list
    expect(list[0]).toHaveTextContent("Mop");
    expect(list[0]).toHaveTextContent("10/23/2025");
    expect(list[0]).toHaveTextContent("Leeza");
    expect(list[0]).toHaveTextContent("1");
    expect(list[0]).toHaveTextContent("10/30/2025");

    expect(list[1]).toHaveTextContent("Vacuum");
    expect(list[1]).toHaveTextContent("10/30/2025");
    expect(list[1]).toHaveTextContent("Amanda");
    expect(list[1]).toHaveTextContent("1");
    expect(list[1]).toHaveTextContent("11/6/2025");
  });

  it("checks if checkboxes are being checked or not", async () => {
    const sampleChores = [
      {
        choreName: "Mop",
        dueDate: "10/23/2025",
        assignee: "Leeza",
        frequency: "1",
        reminder: "10/30/2025",
      },
      {
        choreName: "Vacuum",
        dueDate: "10/30/2025",
        assignee: "Amanda",
        frequency: "1",
        reminder: "11/06/2025",
      },
    ];

    const setChores = vi.fn();

    render(<ChoreList chores={sampleChores} setChores={setChores} />);

    const checkboxes = await screen.findAllByRole("checkbox");
    console.log("checkbox count:", checkboxes.length);
    console.log("checkboxes:", checkboxes);

    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();


    fireEvent.click(checkboxes[1]);
    expect(checkboxes[1]).toBeChecked();
    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();
    fireEvent.click(checkboxes[1]);

    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();
  });

  //   it("removes non-repeating chores after 5 seconds", async () => {
  //     const initialChores = [
  //       {
  //         choreName: "Clean toilet",
  //         dueDate: new Date().toISOString(),
  //         reminder: new Date().toISOString(),
  //         assignee: "Leeza",
  //         frequency: "", // non-repeating
  //         completed: false,
  //       },
  //     ];

  //     const setChores = vi.fn();

  //     render(<ChoreList chores={initialChores} setChores={setChores} />);

  //     // Find the chore card + checkbox
  //     const card = screen
  //       .getByText("Clean toilet")
  //       .closest('[data-testid="chore-list"]');
  //     const checkbox = within(card).getByRole("checkbox");

  //     // Mark the chore as complete
  //     fireEvent.click(checkbox);

  //     // Jump time forward *inside act*
  //     await act(async () => {
  //       vi.advanceTimersByTime(5000);
  //     });

  //     // Check that setChores was called to remove it
  //     await waitFor(() => {
  //       expect(setChores).toHaveBeenCalled();
  //     });

  //     vi.useRealTimers(); // cleanup
  //   });
  //   //   const initialChores = [
  //   //     {
  //   //       choreName: "Clean toilet",
  //   //       dueDate: "10/23/2025",
  //   //       assignee: "Leeza",
  //   //       frequency: "",
  //   //       reminder: "10/30/2025",
  //   //     },
  //   //   ];

  //   //   function Wrapper() {
  //   //     const [chores, setChores] = useState(initialChores);
  //   //     return <ChoreList chores={chores} setChores={setChores} />;
  //   //   }

  //   //   vi.useFakeTimers();
  //   //   render(<Wrapper />);

  //   //   // const checkbox = screen.getByTestId("chore-checkbox-0");
  //   //   const cleanToiletCard = screen
  //   //     .getByText("Clean toilet")
  //   //     .closest('[data-testid="chore-list"]');
  //   //   const checkbox = within(cleanToiletCard).getByRole("checkbox");

  //   //   fireEvent.click(checkbox);

  //   //   expect(screen.getByText("Clean toilet")).toBeInTheDocument();

  //   //   vi.runOnlyPendingTimers();

  //   //   await waitFor(() => {
  //   //     expect(screen.queryByText("Clean toilet")).not.toBeInTheDocument();
  //   //   });
  //   // });

  //   it("rotates repeating chores and resets checkbox after 5 seconds", async () => {
  //     const initialChores = [
  //       {
  //         choreName: "Take out trash",
  //         dueDate: "10/23/2025",
  //         assignee: "Amanda",
  //         frequency: "1",
  //         reminder: "10/23/2025",
  //       },
  //     ];

  //     function Wrapper() {
  //       const [chores, setChores] = useState(initialChores);
  //       return <ChoreList chores={chores} setChores={setChores} />;
  //     }

  //     vi.useFakeTimers();
  //     render(<Wrapper />);

  //     const checkbox = screen.getByTestId("chore-checkbox-0");
  //     fireEvent.click(checkbox);

  //     vi.advanceTimersByTime(5000);

  //     await waitFor(() =>
  //       expect(screen.getByText("Take out trash")).toBeInTheDocument()
  //     );

  //     expect(screen.getByText(/Assigned to: Amanda/)).toBeInTheDocument();
  //     const updatedCheckboxes = screen.getAllByTestId("chore-checkbox-0");
  //     expect(updatedCheckboxes[0]).not.toBeChecked();
  //     expect(screen.getByText(/Due:.*10\/24\/2025/)).toBeInTheDocument();
  //   });
});
