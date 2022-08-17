import { Dispatch, SetStateAction } from "react";
import { DropResult } from "react-beautiful-dnd";
import { TaskColumn } from "../models/taskColumn";

export const onDragEnd = (
  result: DropResult,
  columns: TaskColumn,
  setColumns: Dispatch<SetStateAction<TaskColumn>>
) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];

    const sourcetasks = [...sourceColumn.tasks];
    const destinationTasks = [...destinationColumn.tasks];

    const [removed] = sourcetasks.splice(source.index, 1);
    destinationTasks.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        tasks: sourcetasks,
      },
      [destination.droppableId]: {
        ...destinationColumn,
        tasks: destinationTasks,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const tasksForColumn = [...column.tasks];

    const [removed] = tasksForColumn.splice(source.index, 1);
    tasksForColumn.splice(destination.index, 0, removed);

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        tasks: tasksForColumn,
      },
    });
  }
};
