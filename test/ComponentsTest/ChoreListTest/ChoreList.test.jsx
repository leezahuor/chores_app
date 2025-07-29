import React from "react";
import { render, screen } from "@testing-library/react";
import ChoreList from "../../../src/components/ChoreList/ChoreList";
import * as C from "../../../src/components/ChoreList/ChoreListConstants";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";

describe("ChoreList", () => {
  it("checks if empty message displays when chore list is empty", async () => {
    render(<ChoreList chores={[]} />);
    const emptyMessage = screen.getByText(C.CHORE_LIST_EMPTY_MSG);
    expect(emptyMessage).toBeInTheDocument();
  });

  it("checks if sample chores are being displayed", async () => {
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
});
