import React, { useState, useRef } from "react";
import "./ChoreItem.css";
import { getNextDate, getNextAssignee } from "../../utils/ChoreUtils";

function ChoreItem({ chore, index, onDelete, onUpdate }) {
  const [isChecked, setIsChecked] = useState(false);
  const [showUndo, setShowUndo] = useState(false);
  const timerRef = useRef(null);

  const handleOnChange = () => {
    setIsChecked(true);
    setShowUndo(true);

    timerRef.current = setTimeout(() => {
      setShowUndo(false);
      if (chore.frequency === "once") {
        onDelete(chore.id);
      } else {
        onUpdate({
          ...chore,
          dueDate: getNextDate(chore.dueDate, chore.frequency),
          assignee: getNextAssignee(chore.assignee),
          reminder: getNextDate(chore.reminder, chore.frequency),
        });
      }
      setIsChecked(false);
    }, 3000);
  };

  const handleUndo = () => {
    clearTimeout(timerRef.current);
    setIsChecked(false);
    setShowUndo(false);
  };

  return (
    <div className="chore-card" data-testid={`chore-item-${index}`}>
      <div className="chore-name">
        <input
          type="checkbox"
          id={`custom-checkbox-${index}`}
          checked={isChecked}
          onChange={handleOnChange}
          disabled={isChecked && showUndo}
        />
        <label
          htmlFor={`custom-checkbox-${index}`}
          className={isChecked ? "chore-completed" : ""}
        >
          {chore.choreName}
        </label>
        {showUndo && (
          <button onClick={handleUndo} className="undo-button">
            Undo
          </button>
        )}
      </div>

      <div className="chore-info">
        <span data-testid="chore-due-date">
          Due: {new Date(chore.dueDate).toLocaleDateString()}
        </span>
        <span>Assigned to: {chore.assignee}</span>
        <span>Frequency: {chore.frequency}</span>
        <span>Reminder: {new Date(chore.reminder).toLocaleDateString()}</span>
      </div>
    </div>
  );
}

export default ChoreItem;
