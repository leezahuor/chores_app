import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../src/App";
import React from "react";
import "@testing-library/jest-dom/vitest";

// Mock AddChore to capture the onAddChore prop
vi.mock("../src/components/AddChore/AddChore.jsx", () => {
  // Mock function to replace actual AddChore component in tests
  function Mock({ onAddChore }) {
    // useRef to make sure onAddChore is only called once
    const called = React.useRef(false);
    React.useEffect(() => {
      if (!called.current) {
        onAddChore({
          choreName: "Test",
          dueDate: "2025-10-23",
          assignee: "Leeza",
          frequency: "1",
          reminder: "2025-10-30",
        });
        called.current = true;
      }
    }, [onAddChore]);
    return <div data-testid="mock-addChore" />;
  }
  return { default: Mock };
});

// Mock HomePage to render chore list and accompanying details
vi.mock("../src/pages/HomePage.jsx", () => {
  return {
    default: ({ chores, onShowModal }) => (
      <div>
        <button data-testid="add-chore-btn" onClick={onShowModal}>
          Add Chore
        </button>
        <div>
          {chores.map((chore, idx) => (
            <div key={idx} data-testid="chore">
              <span>{chore.choreName}</span>
              <span>{chore.dueDate}</span>
              <span>{chore.assignee}</span>
              <span>{chore.frequency}</span>
              <span>{chore.reminder}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  };
});

describe("App", () => {
  it("Tests onAddChore function defined in App.jsx to add a new chore and displays it on the HomePage", async () => {
    render(<App />);

    // Simulates add chore button is clicked
    fireEvent.click(screen.getByTestId("add-chore-btn"));

    // Mock chore is added to list and verified
    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByText("2025-10-23")).toBeInTheDocument();
    expect(screen.getByText("Leeza")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2025-10-30")).toBeInTheDocument();
  });
});
