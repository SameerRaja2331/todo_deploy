import React, { useEffect } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { db } from "./firebase_config";

export default function TodoListItem({
  todo,
  inprogress,
  id,
  userid,
  start_Date,
}) {
  const toogleInProgress = () => {
    db.collection(`todos_${userid}`).doc(id).update({
      inprogress: !inprogress,
    });
  };

  const deleteTodo = () => {
    db.collection(`todos_${userid}`).doc(id).delete();
  };

  return (
    <>
      <div className="todo-row">
        <div>
          <span style={{ fontSize: 20 }}>{todo}</span>
          <br />
          <div onClick={toogleInProgress}>
            {inprogress ? (
              <span style={{ color: "red" }}>In Progress</span>
            ) : (
              <span style={{ color: "green" }}>Completed</span>
            )}
          </div>
        </div>
        <div className="icons">
          <RiCloseCircleLine className="delete-icon" onClick={deleteTodo} />
        </div>
      </div>
    </>
  );
}
