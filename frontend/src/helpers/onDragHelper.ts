import { Dispatch, SetStateAction } from "react";
import { DropResult } from "react-beautiful-dnd";
import { Task } from "../models/task";
import { TaskColumn } from "../models/taskColumn";
import { updateTaskOrder } from "../services/tasks.service";

export const onDragEnd = (
  result: DropResult,
  columns: TaskColumn,
  setTasks: Dispatch<SetStateAction<Task[]>>
) => {
  if (!result.destination) return;
  const { source, destination } = result;
  let newColumns;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];

    const sourcetasks = [...sourceColumn.tasks];
    const destinationTasks = [...destinationColumn.tasks];

    const [removed] = sourcetasks.splice(source.index, 1);
    removed.status = destination.droppableId as Task["status"];
    destinationTasks.splice(destination.index, 0, removed);

    newColumns = {
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        tasks: sourcetasks,
      },
      [destination.droppableId]: {
        ...destinationColumn,
        tasks: destinationTasks,
      },
    };
  } else {
    const column = columns[source.droppableId];
    const tasksForColumn = [...column.tasks];

    const [removed] = tasksForColumn.splice(source.index, 1);
    removed.status = destination.droppableId as Task["status"];
    tasksForColumn.splice(destination.index, 0, removed);

    newColumns = {
      ...columns,
      [source.droppableId]: {
        ...column,
        tasks: tasksForColumn,
      },
    };
  }

  const newTasks = [
    ...newColumns["todo"].tasks,
    ...newColumns["inprogress"].tasks,
    ...newColumns["completed"].tasks,
  ];

  setTasks(newTasks);
  updateTaskOrder(newTasks)
    .then((msg) => {
      console.log(msg);
    })
    .catch((error) => {
      console.error(error);
    });
};
