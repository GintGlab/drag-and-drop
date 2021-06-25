import React, { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import "./AddNewTaskButton.css";
import columns from "../../store/columns";

interface AddNewTaskButtonProps {
  columnId: number;
  header: string;
}

function handleChange(event: { target: { value: string } }) {
  columns.header = event.target.value;
}

const AddNewTaskButton = ({ columnId }: AddNewTaskButtonProps) => {
  const [createTask, setCreateTask] = useState(false);
  return !createTask ? (
    <div className="addTaskWrapper">
      <AddOutlinedIcon />
      <div onClick={() => setCreateTask(true)}>Add new card</div>
    </div>
  ) : (
    <div className="inputTaskNameWrapper">
      <input className="inputTaskName" onChange={handleChange} />
      <button
        className="confirmTaskName"
        onClick={() => {
          columns.addTaskToColumn(columnId);
          setCreateTask(false);
        }}
      >
        Add Task
      </button>
    </div>
  );
};

export default AddNewTaskButton;
