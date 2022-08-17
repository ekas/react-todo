import { useEffect, useState } from "react";
import TaskBlock from "../TaskBlock";
import BoardColumn from "../BoardColumn";
import { onDragEnd } from "../../helpers/onDragHelper";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  addNewTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../../services/tasks.service";
import { columnJSON, updateColumnswithTasks } from "../../helpers/boardHelper";

import { Task } from "../../models/task";
import { TaskColumn } from "../../models/taskColumn";

import "./index.less";

const Board = () => {
  const [tasks, setTasks] = useState<Task[]>();
  const [columns, setColumns] = useState<TaskColumn>(columnJSON);

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

  const deleteTaskAction = (id: string) => {
    if (id) {
      deleteTask(id)
        .then((msg) => {
          console.log(msg);
          tasks && setTasks(tasks.filter((task) => task.id !== id));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const addUpdateTaskAction = (task: Task, type: "ADD" | "UPDATE") => {
    if (task) {
      if (type === "ADD") {
        addNewTask(task)
          .then((msg) => {
            console.log(msg);
            tasks ? setTasks([task, ...tasks]) : setTasks([task]);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        updateTask(task)
          .then((msg) => {
            console.log(msg);
            if (tasks) {
              setTasks(
                tasks.map((t) => {
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
            console.error(error);
          });
      }
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
                      showAddButton={column.type === "todo"}
                      addUpdateTaskAction={addUpdateTaskAction}
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
                                  deleteTaskAction={deleteTaskAction}
                                  addUpdateTaskAction={addUpdateTaskAction}
                                  style={{
                                    userSelect: "none",
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
