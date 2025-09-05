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

// afterEach(cleanup);

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
        id: 1,
        choreName: "Mop",
        dueDate: "10/23/2025",
        assignee: "Leeza",
        frequency: "1",
        reminder: "10/30/2025",
      },
      {
        id: 2,
        choreName: "Vacuum",
        dueDate: "10/30/2025",
        assignee: "Amanda",
        frequency: "1",
        reminder: "11/06/2025",
      },
    ];

    render(<ChoreList chores={sampleChores} />);

    const listItems = screen.getAllByTestId(/chore-item-/);
    expect(listItems).toHaveLength(sampleChores.length);

    sampleChores.forEach((chore) => {
      expect(screen.getByText(chore.choreName)).toBeInTheDocument();
    });
  });
});
