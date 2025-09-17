import React, { useState, useRef } from "react";
import "./ChoreItem.css";
import {
  getNextDate,
  getNextAssignee,
  formatDisplayDate,
} from "../../utils/ChoreUtils";

function ChoreItem({ chore, index, onDelete, onUpdate }) {
  const [isChecked, setIsChecked] = useState(false); // Keeps track of checked state
  const [showUndo, setShowUndo] = useState(false); // Keeps track of undo button state
  const timerRef = useRef(null); // Keeps track of timer

  // When chore is checked, undo button appears and a timer begins to give users
  // a 3 second window to undo the check, otherwise chore will get updated.
  // If chore occurs once, chore gets deleted from list.
  // If chore is reoccuring (daily, weekly, monthly, etc.), chore due date and reminder date gets
  // updated and assignee will cycle to next person in group.
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
          Due: {formatDisplayDate(chore.dueDate)}
        </span>
        <span>Assigned to: {chore.assignee}</span>
        <span>Frequency: {chore.frequency}</span>
        <span>Reminder: {formatDisplayDate(chore.reminder)}</span>
        <span>Location: {chore.location}</span>
      </div>
    </div>
  );
}

export default ChoreItem;
