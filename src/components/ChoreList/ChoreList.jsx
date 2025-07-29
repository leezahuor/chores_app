import React from "react";
import "./ChoreList.css";
import * as C from "./ChoreListConstants";

function ChoreList({ chores }) {

  return (
    <div className="chore-list-container">
      <h2 className="chore-list-title">Chores</h2>
      <div className="chore-list-scroll">
        {/* If chore list is empty, display empty message, otherwise create chore cards */}
        {chores.length === 0 ? (
          <p className="chore-empty-message">{C.CHORE_LIST_EMPTY_MSG}</p>
        ) : (
          chores.map((chore, index) => (
            <div className="chore-card" key={index} data-testid="chore-list">
              <div className="chore-name">{chore.choreName}</div>
              <div className="chore-info">
                <span>Due: {new Date(chore.dueDate).toLocaleDateString()}</span>
                <span>Assigned to: {chore.assignee}</span>
                <span>Frequency: {chore.frequency}</span>
                <span>Reminder: {new Date(chore.reminder).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ChoreList;
