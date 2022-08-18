import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { Task } from "../models/task";
import { TaskColumn } from "../models/taskColumn";
import { v4 as uuidv4 } from "uuid";
import { addNewTask, updateTask } from "../services/tasks.service";

export const updateColumnswithTasks = (
  tasks: Task[],
  columns: TaskColumn,
  setColumns: Dispatch<SetStateAction<TaskColumn>>
) => {
  const columnsWithTasks = {
    ...columns,
    todo: {
      ...columns["todo"],
      tasks: tasks.filter((task) => task.status === "todo"),
    },
    inprogress: {
      ...columns["inprogress"],
      tasks: tasks.filter((task) => task.status === "inprogress"),
    },
    completed: {
      ...columns["completed"],
      tasks: tasks.filter((task) => task.status === "completed"),
    },
  };
  setColumns(columnsWithTasks);
};

export const addUpdateTaskActionHelper = (
  task: Task,
  tasksState: Task[],
  setTasks: Dispatch<SetStateAction<Task[]>>,
  type: "ADD" | "UPDATE"
) => {
  if (type === "ADD") {
    addNewTask(task)
      .then((msg) => {
        toast.success(msg);
        tasksState ? setTasks([task, ...tasksState]) : setTasks([task]);
      })
      .catch((error) => {
        toast.error(error);
      });
  } else {
    updateTask(task)
      .then((msg) => {
        toast.success(msg);
        if (tasksState) {
          setTasks(
            tasksState.map((t) => {
              if (t.id === task.id) {
                t.title = task.title;
                t.description = task.description;
                t.status = task.status;
              }
              return t;
            })
          );
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  }
};

export const columnJSON: TaskColumn = {
  todo: {
    name: "To Do",
    type: "todo",
    tasks: [],
  },
  inprogress: {
    name: "In Progress",
    type: "inprogress",
    tasks: [],
  },
  completed: {
    name: "Completed",
    type: "completed",
    tasks: [],
  },
};

export const getUniqueID = () => uuidv4();

export const addTaskJSON: Task = {
  id: getUniqueID(),
  title: "New Task",
  description: "Add your description here",
  status: "todo",
};
