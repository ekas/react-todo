import BoardColumn from "../BoardColumn";
import TaskBlock from "../TaskBlock";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import "./index.less";
import { useEffect, useState } from "react";
import { Task } from "../../models/task";
import { getAllTasks } from "../../services/tasks.service";
import { TaskColumn } from "../../models/taskColumn";
import { onDragEnd } from "../../helpers/onDragHelper";
import { updateColumnswithTasks } from "../../helpers/boardHelper";

const Board = () => {
  const [tasks, setTasks] = useState<Task[]>();
  const [columns, setColumns] = useState<TaskColumn>({
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
  });

  useEffect(() => {
    getAllTasks()
      .then((tasks) => setTasks(tasks))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (tasks) {
      updateColumnswithTasks(tasks, columns, setColumns);
    }
  }, [tasks]);

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
