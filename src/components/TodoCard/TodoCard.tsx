import React, { useState } from "react";

import columns from "../../store/columns";

import "./TodoCard.css";

interface TodoCardProps {
  text: string;
  difficult: number;
  taskOwner: string;
  taskId: number;
  header: string;
  columnId: number;
}

const TodoCard = ({
  text,
  difficult,
  taskOwner,
  header,
  taskId,
  columnId,
}: TodoCardProps) => {
  const [editOpen, setEditOpen] = useState(false);
  const [headerValue, setHeaderValue] = useState(header);
  const [textValue, setTextValue] = useState(text);
  const [difficultValue, setDifficultValue] = useState(difficult);
  const [taskOwnerValue, setTaskOwnerValue] = useState(taskOwner);
  function handleChangeHeader(event: { target: { value: string } }) {
    columns.header = event.target.value;
    setHeaderValue(columns.header);
  }
  function handleChangeTaskText(event: { target: { value: string } }) {
    columns.taskText = event.target.value;
    setTextValue(columns.taskText);
  }
  function handleChangeTaskDifficult(event: { target: { value: any } }) {
    columns.taskDifficult = event.target.value;
    setDifficultValue(columns.taskDifficult);
  }
  function handleChangeTaskOwner(event: { target: { value: string } }) {
    columns.taskOwner = event.target.value;
    setTaskOwnerValue(columns.taskOwner);
  }
  return !editOpen ? (
    <div className="taskWrapper">
      <div className="header_task">{header}</div>
      <div>
        <div className="text">Text : {text}</div>
        <div className="difficult">Difficult: {difficult}</div>
        <div className="owner">Owner: {taskOwner}</div>
        <div className="buttonWrapper">
          <button className="editButton" onClick={() => setEditOpen(true)}>
            Edit Task
          </button>
          <button
            className="deleteButton"
            onClick={() => columns.deleteTask(taskId, columnId)}
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="editCardWrapper">
      <div className="editCardHeader">
        <div className="editCardHeaderText">Edit Card</div>
      </div>
      <div className="inputWrapper">
        <input
          className="editInput"
          placeholder="Header"
          onChange={handleChangeHeader}
          value={headerValue}
        />
        <input
          className="editInput"
          placeholder="Text"
          onChange={handleChangeTaskText}
          value={textValue}
        />
        <input
          type="number"
          className="editInput"
          placeholder="Difficult"
          onChange={handleChangeTaskDifficult}
          value={difficultValue}
        />
        <input
          className="editInput"
          placeholder="Task Owner"
          onChange={handleChangeTaskOwner}
          value={taskOwnerValue}
        />
        <div className="confirmEditCardWrapper">
          <button
            className="confirmEditCard"
            onClick={() => {
              columns.endEditFunc(
                taskId,
                columnId,
                headerValue,
                textValue,
                difficultValue,
                taskOwnerValue
              );
              setEditOpen(false);
            }}
          >
            Confirm Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
