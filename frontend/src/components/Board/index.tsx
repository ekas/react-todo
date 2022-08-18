import { useEffect, useState } from "react";
import TaskBlock from "../TaskBlock";
import BoardColumn from "../BoardColumn";
import { onDragEnd } from "../../helpers/onDragHelper";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { deleteTask, getAllTasks } from "../../services/tasks.service";
import {
  addUpdateTaskActionHelper,
  columnJSON,
  updateColumnswithTasks,
} from "../../helpers/boardHelper";

import { Task } from "../../models/task";
import { TaskColumn } from "../../models/taskColumn";

import "./index.less";
import { toast } from "react-toastify";

const Board = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [columns, setColumns] = useState<TaskColumn>(columnJSON);

  useEffect(() => {
    getAllTasks()
      .then((tasks) => {
        toast.success("Tasks loaded successfully");
        setTasks(tasks);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    if (tasks) {
      updateColumnswithTasks(tasks, columns, setColumns);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  const deleteTaskAction = (id: string) => {
    if (id) {
      deleteTask(id)
        .then((msg) => {
          toast.success(msg);
          tasks && setTasks(tasks.filter((task) => task.id !== id));
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  const addUpdateTaskAction = (task: Task, type: "ADD" | "UPDATE") => {
    if (task) {
      addUpdateTaskActionHelper(task, tasks, setTasks, type);
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
          onDragEnd={(result) => onDragEnd(result, columns, setTasks)}
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
