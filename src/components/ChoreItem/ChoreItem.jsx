import React, { useState, useRef } from "react";
import "./ChoreItem.css";

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
    <li className="chore-card" data-testid="chore-list">
      <div className="chore-name">
        <input
          type="checkbox"
          id={`custom-checkbox-${index}`}
          checked={isChecked}
          onChange={handleOnChange}
          disabled={isChecked && showUndo}
          data-testid={`chore-checkbox-${index}`}
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
    </li>
  );
}

function getNextDate(current, frequency) {
  const newDueDate = new Date(current);
  if (frequency === "daily") newDueDate.setDate(newDueDate.getDate() + 1);
  if (frequency === "weekly") newDueDate.setDate(newDueDate.getDate() + 7);
  if (frequency === "monthly") newDueDate.setDate(newDueDate.getDate() + 28);
  return newDueDate;
}

function getNextAssignee(currentAssignee) {
  const assigneesList = ["Leeza", "Amanda", "Josh", "Sesame"];
  const idx = assigneesList.indexOf(currentAssignee);

  if (idx === -1) return assigneesList[0];

  return assigneesList[(idx + 1) % assigneesList.length];
}

export default ChoreItem;
