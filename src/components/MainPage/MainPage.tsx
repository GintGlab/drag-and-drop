import React from "react";
import { observer } from "mobx-react-lite";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

import columns from "../../store/columns";
import AddColumnButton from "../AddColumnButton/AddColumnButton";
import Header from "../../Header/Header";
import AddNewTaskButton from "../AddNewTask/AddNewTaskButton";
import TodoCard from "../TodoCard/TodoCard";
import "./MainPage.css";

interface ICulom {
  header: string;
  columnId: number;
  tasks: [];
  title: string;
}

interface ITask {
  header: string;
  text: string;
  difficult: number;
  taskOwner: string;
  taskId: number;
}

const MainPage = observer(() => {
  function dragStartHandler(
    e: React.DragEvent<HTMLDivElement>,
    task: ITask,
    column: ICulom
  ) {
    columns.currentTask = task;
    columns.currentColumn = column;
  }

  function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
  }

  function dragEndHandler(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
  }

  function dragOverHandler(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
  }

  function dropCardHandler(
    e: React.DragEvent<HTMLDivElement>,
    column: ICulom
  ): void {
    columns.dropCard(column);
  }

  function dropHandler(
    e: React.DragEvent<HTMLDivElement>,
    task: ITask,
    column: ICulom
  ): void {
    e.preventDefault();
    e.stopPropagation();
    columns.dropHandlerFunc(task, column);
  }

  return (
    <>
      <Header />
      <div className="columnsWrapper">
        <div className="ColumnHeader">
          {columns.columnsArr.map((column: ICulom, idx: number) => (
            <div
              className="column"
              onDragOver={(e) => dragOverHandler(e)}
              onDrop={(e) => dropCardHandler(e, column)}
              key={column.columnId}
            >
              <div className="columnHeaderItem" key={column.columnId}>
                {column.title}
                <div
                  className="deleteColumn"
                  onClick={() => columns.deleteColumn(idx)}
                >
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>

              <div>
                {column.tasks.map((task: ITask) => (
                  <div
                    key={task.taskId}
                    draggable={true}
                    onDragStart={(e) => dragStartHandler(e, task, column)}
                    onDragLeave={(e) => dragLeaveHandler(e)}
                    onDragOver={(e) => dragOverHandler(e)}
                    onDragEnd={(e) => dragEndHandler(e)}
                    onDrop={(e) => dropHandler(e, task, column)}
                  >
                    <TodoCard
                      text={task.text}
                      taskId={task.taskId}
                      difficult={task.difficult}
                      taskOwner={task.taskOwner}
                      header={task.header}
                      columnId={idx}
                    />
                  </div>
                ))}
              </div>
              <AddNewTaskButton
                columnId={column.columnId}
                header={column.header}
              />
            </div>
          ))}
        </div>
        <AddColumnButton />
      </div>
    </>
  );
});

export default MainPage;
