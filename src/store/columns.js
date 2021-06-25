import { makeAutoObservable } from "mobx";

class Columns {
  columnsArr = JSON.parse(localStorage.getItem("columns")) || [];
  columnName = "";
  header = "";
  taskText = "";
  taskDifficult = 0;
  taskOwner = "";
  currentColumn = null;
  currentTask = null;
  constructor() {
    makeAutoObservable(this);
  }

  addNewColumnEnd() {
    this.columnsArr.push({
      title: this.columnName,
      tasks: [],
      columnId: Date.now(),
    });
    this.columnName = "";
    localStorage.setItem("columns", JSON.stringify(this.columnsArr));
  }

  deleteColumn(idx) {
    this.columnsArr.splice(idx, 1);
    localStorage.setItem("columns", JSON.stringify(this.columnsArr));
  }

  addTaskToColumn(columnId) {
    const currentColumn = this.columnsArr.find((item) => {
      return item.columnId === columnId;
    });
    currentColumn.tasks.push({
      header: this.header,
      text: this.taskText,
      difficult: this.taskDifficult,
      taskOwner: this.taskOwner,
      taskId: Date.now(),
    });
    localStorage.setItem("columns", JSON.stringify(this.columnsArr));
    this.header = "";
    this.taskText = "";
    this.taskDifficult = 0;
    this.taskOwner = "";
  }

  deleteTask(taskId, columnId) {
    this.columnsArr[columnId].tasks = this.columnsArr[columnId].tasks.filter(
      (el) => el.taskId !== taskId
    );
    localStorage.setItem("columns", JSON.stringify(this.columnsArr));
  }

  dropCard(column) {
    column.tasks.push(this.currentTask);
    const currentIndex = this.currentColumn.tasks.indexOf(this.currentTask);
    this.currentColumn.tasks.splice(currentIndex, 1);
    this.columnsArr.map((b) => {
      if (b.taskId === column.columnId) {
        return column;
      }
      if (b.taskId === this.currentColumn.columnId) {
        return this.currentColumn;
      }
      return b;
    });
    localStorage.setItem("columns", JSON.stringify(this.columnsArr));
  }

  dropHandlerFunc(task, column) {
    const currentIndex = this.currentColumn.tasks.indexOf(this.currentTask);
    this.currentColumn.tasks.splice(currentIndex, 1);
    const dropIndex = column.tasks.indexOf(task);
    column.tasks.splice(dropIndex + 1, 0, this.currentTask);
    localStorage.setItem("columns", JSON.stringify(this.columnsArr));
  }

  endEditFunc(
    taskId,
    columnId,
    headerValue,
    textValue,
    difficultValue,
    taskOwnerValue
  ) {
    const currentIndex = this.columnsArr[columnId].tasks.findIndex(
      (item) => item.taskId === taskId
    );
    this.columnsArr[columnId].tasks[currentIndex].header = headerValue;
    this.columnsArr[columnId].tasks[currentIndex].text = textValue;
    this.columnsArr[columnId].tasks[currentIndex].difficult = difficultValue;
    this.columnsArr[columnId].tasks[currentIndex].taskOwner = taskOwnerValue;
    localStorage.setItem("columns", JSON.stringify(this.columnsArr));
    this.header = "";
    this.taskText = "";
    this.taskDifficult = 0;
    this.taskOwner = "";
  }
}

export default new Columns();
