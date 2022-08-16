import BoardColumn from "../BoardColumn";
import TaskBlock from "../TaskBlock";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

import "./index.less";
import { useState } from "react";
import { Task } from "../../models/task";

interface columnsFromBackendType {
  [key: string]: {
    name: string;
    type: "todo" | "inprogress" | "completed";
    tasks: Task[];
  };
}

const itemsFromBackend: Task[] = [
  { id: uuidv4(), title: "First task", description: "1st task description" },
  { id: uuidv4(), title: "Sec task", description: "2nd task description" },
  { id: uuidv4(), title: "Third task", description: "3rd task description" },
  { id: uuidv4(), title: "Fourth task", description: "4th task description" },
  { id: uuidv4(), title: "Fifth task", description: "5th task description" },
];

const columnsFromBackend: columnsFromBackendType = {
  [uuidv4()]: {
    name: "To Do",
    type: "todo",
    tasks: itemsFromBackend,
  },
  [uuidv4()]: {
    name: "In Progress",
    type: "inprogress",
    tasks: [],
  },
  [uuidv4()]: {
    name: "Completed",
    type: "completed",
    tasks: [],
  },
};

const Board = () => {
  const [columns, setColumns] = useState(columnsFromBackend);

  const onDragEnd = (
    result: any,
    columns: columnsFromBackendType,
    setColumns: any
  ) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.tasks];
      const destItems = [...destColumn.tasks];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          tasks: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.tasks];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          tasks: copiedItems,
        },
      });
    }
  };

  return (
    <div className="board">
      <div className="board-header">
        <h2>TO DO List</h2>
        <span>This week</span>
      </div>
      <div className="board-content">
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <Droppable droppableId={columnId} key={columnId}>
                {(provided, snapshot) => {
                  return (
                    <BoardColumn
                      reference={provided.innerRef}
                      heading={column.name}
                      tasksLength={column.tasks.length}
                      type={column.type}
                      style={{
                        backgroundColor: snapshot.isDraggingOver
                          ? "lightblue"
                          : "",
                      }}
                      props={provided.droppableProps}
                    >
                      {column.tasks.map((task, index) => {
                        return (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <TaskBlock
                                  mode="read"
                                  task={task}
                                  style={{
                                    userSelect: "none",
                                    backgroundColor: snapshot.isDragging
                                      ? "#263B4A"
                                      : "",
                                    ...provided.draggableProps.style,
                                  }}
                                  reference={provided.innerRef}
                                  dragHandleProps={provided.dragHandleProps}
                                  draggableProps={provided.draggableProps}
                                  key={task.id}
                                />
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </BoardColumn>
                  );
                }}
              </Droppable>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
};

export default Board;
