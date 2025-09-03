import React from "react";
import "./ChoreList.css";
import * as C from "./ChoreListConstants";
import ChoreItem from "../ChoreItem/ChoreItem";

function ChoreList({ chores, onDelete, onUpdate }) {

  return (
    <div className="chore-list-container">
      <h2 className="chore-list-title">Chores</h2>
      <div className="chore-list-scroll">
        {/* If chore list is empty, display empty message, otherwise create chore cards */}
        {chores.length === 0 ? (
          <p className="chore-empty-message">{C.CHORE_LIST_EMPTY_MSG}</p>
        ) : (
          <ul>
            {chores.map((chore, index) => (
              <ChoreItem
                key={chore.id}
                chore={chore}
                index={index}
                onDelete={onDelete}
                onUpdate={onUpdate}
                className="chore-card"
                data-testid="chore-list"
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ChoreList;
