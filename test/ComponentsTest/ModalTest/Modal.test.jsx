import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../../../src/components/Modal/Modal";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

describe("Modal", () => {
  it("renders modal correctly", () => {
    render(
      <Modal onClose={() => {}}>
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.getByText("Modal Content")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  it("calls onClose when clicking overlay", () => {
    const mockClose = vi.fn();

    render(
      <Modal onClose={mockClose}>
        <p>Inside Modal</p>
      </Modal>
    );

    fireEvent.click(screen.getByText("Inside Modal").closest(".modal-overlay"));
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when clicking close button", () => {
    const mockClose = vi.fn();

    render(
      <Modal onClose={mockClose}>
        <p>Inside Modal</p>
      </Modal>
    );

    fireEvent.click(screen.getByTestId("modal-close-button"));
    expect(mockClose).toHaveBeenCalled();
  });

  it("does not call onClose when clicking inside modal", () => {
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
