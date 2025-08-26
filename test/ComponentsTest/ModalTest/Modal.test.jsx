import { afterEach, describe, it, expect, vi } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import Modal from "../../../src/components/Modal/Modal";
import React from "react";
import "@testing-library/jest-dom/vitest";

// Clears DOM after each test
afterEach(cleanup);

describe("Modal", () => {
  it("Checks if modal renders correctly", () => {
    render(
      <Modal onClose={() => {}}>
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.getByText("Modal Content")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  it("Calls onClose when clicking overlay", () => {
    const mockClose = vi.fn();

    render(
      <Modal onClose={mockClose}>
        <p>Inside Modal</p>
      </Modal>
    );

    fireEvent.click(screen.getByText("Inside Modal").closest(".modal-overlay"));
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it("Calls onClose when clicking close button", () => {
    const mockClose = vi.fn();

    render(
      <Modal onClose={mockClose}>
        <p>Inside Modal</p>
      </Modal>
    );

    fireEvent.click(screen.getByTestId("modal-close-button"));
    expect(mockClose).toHaveBeenCalled();
  });

  it("Does not call onClose when clicking inside modal", () => {
    const mockClose = vi.fn();

    render(
      <Modal onClose={mockClose}>
        <p>Modal Body</p>
      </Modal>
    );

    fireEvent.click(screen.getByText("Modal Body"));
    expect(mockClose).not.toHaveBeenCalled();
  });
});
