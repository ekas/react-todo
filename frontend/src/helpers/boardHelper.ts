import { Dispatch, SetStateAction } from "react";
import { Task } from "../models/task";
import { TaskColumn } from "../models/taskColumn";

export const updateColumnswithTasks = (
  tasks: Task[],
  columns: TaskColumn,
  setColumns: Dispatch<SetStateAction<TaskColumn>>
) => {
  const columnsWithTasks = {
    ...columns,
    ["todo"]: {
      ...columns["todo"],
      tasks: tasks.filter((task) => task.status === "todo"),
    },
    ["inprogress"]: {
      ...columns["inprogress"],
      tasks: tasks.filter((task) => task.status === "inprogress"),
    },
    ["completed"]: {
      ...columns["completed"],
      tasks: tasks.filter((task) => task.status === "completed"),
    },
  };
  setColumns(columnsWithTasks);
};
