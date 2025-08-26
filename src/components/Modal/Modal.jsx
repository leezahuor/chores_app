import React from "react";
import "./Modal.css";

function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button
          onClick={onClose}
          className="modal-close-btn"
          data-testid="modal-close-button"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
