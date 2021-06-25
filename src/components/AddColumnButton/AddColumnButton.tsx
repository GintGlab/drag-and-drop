import React, { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { observer } from "mobx-react-lite";

import columns from "../../store/columns";
import "./AddColumnButton.css";

function handleChange(event: { target: { value: string } }) {
  columns.columnName = event.target.value;
}

const AddColumnButton = observer(() => {
  const [open, setOpen] = useState(false);
  return open == false ? (
    <div className="addColumnButtonWrapper" onClick={() => setOpen(true)}>
      <AddOutlinedIcon />
      <div className="addColumnButton_text">Add new column</div>
    </div>
  ) : (
    <div className="addColumnButtonInput">
      <input className="columnNameInput" onChange={handleChange} />
      <button
        className="confirmColumnName"
        onClick={() => {
          setOpen(false);
          columns.addNewColumnEnd();
        }}
      >
        Add Column
      </button>
    </div>
  );
});

export default AddColumnButton;
