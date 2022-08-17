import { useState } from "react";
import {
  DraggableProps,
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
import { Task } from "../../models/task";
import Button from "../Button";
import EditIcon from "././../../assets/edit.svg";
import DeleteIcon from "././../../assets/delete.svg";
import "./index.less";

interface TaskProps {
  mode: "edit" | "read";
  task: Task;
  style?: React.CSSProperties;
  draggableProps?: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps;
  reference: React.LegacyRef<HTMLDivElement> | undefined;
  deleteTaskAction: (id: string) => void;
  addUpdateTaskAction: (task: Task, type: "ADD" | "UPDATE") => void;
}

const TaskBlock = ({
  mode,
  style,
  reference,
  draggableProps,
  dragHandleProps,
  deleteTaskAction,
  addUpdateTaskAction,
  task: { id, title, description, status },
}: TaskProps) => {
  const [isEditing, setIsEditing] = useState(mode === "edit" ? true : false);
  const [taskObj, setTaskObj] = useState<Task>({
    id,
    title,
    description,
    status,
  });
  return isEditing ? (
    <div
      className="task"
      ref={reference}
      {...dragHandleProps}
      {...draggableProps}
      style={{ ...style }}
    >
      <input
        type="text"
        className="task-title-input"
        id={`${id}-title`}
        required
        value={taskObj.title}
        onChange={(e) => setTaskObj({ ...taskObj, title: e.target.value })}
        placeholder="Enter Task Title"
      />
      <textarea
        id={`${id}-description`}
        className="task-description-input"
        required
        placeholder="Enter Task Description"
        onChange={(e) =>
          setTaskObj({ ...taskObj, description: e.target.value })
        }
        value={taskObj.description}
      />
      <Button
        cssClasses="item-save-button"
        id={`save-button-${id}`}
        onClick={() => {
          addUpdateTaskAction(taskObj, "UPDATE");
          setIsEditing(false);
        }}
      >
        Save Task
      </Button>
    </div>
  ) : (
    <div
      className="task"
      ref={reference}
      {...dragHandleProps}
      {...draggableProps}
    >
      <div className="task-title" title={taskObj.title}>
        {taskObj.title}
      </div>
      <a
        title="Edit Task"
        onClick={(e) => {
          e.preventDefault();
          setIsEditing(true);
        }}
      >
        <img src={EditIcon} alt="Task Edit" className="task-edit" />
      </a>
      <a
        title="Delete Task"
        onClick={(e) => {
          e.preventDefault();
          deleteTaskAction(taskObj.id);
        }}
      >
        <img src={DeleteIcon} alt="Delete Task" className="task-delete" />
      </a>
      <div className="task-description">{taskObj.description}</div>
    </div>
  );
};

export default TaskBlock;
