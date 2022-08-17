import { useState } from "react";
import {
  DraggableProps,
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
import { Task } from "../../models/task";
import Button from "../Button";
import EditIcon from "././../../assets/edit.svg";
import "./index.less";

interface TaskProps {
  mode: "edit" | "read";
  task: Task;
  style?: React.CSSProperties;
  draggableProps?: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps;
  reference: React.LegacyRef<HTMLDivElement> | undefined;
}

const TaskBlock = ({
  mode,
  style,
  reference,
  draggableProps,
  dragHandleProps,
  task: { id, title, description },
}: TaskProps) => {
  const [isEditing, setIsEditing] = useState(mode === "edit" ? true : false);
  const [taskObj, setTaskObj] = useState({ id, title, description });
  return isEditing ? (
    <div
      className="task"
      ref={reference}
      {...dragHandleProps}
      {...draggableProps}
    >
      <input
        type="text"
        className="task-title-input"
        value={taskObj.title}
        onChange={(e) => setTaskObj({ ...taskObj, title: e.target.value })}
        placeholder="Enter Task Title"
      />
      <textarea
        name=""
        id=""
        className="task-description-input"
        placeholder="Enter Task Description"
        onChange={(e) =>
          setTaskObj({ ...taskObj, description: e.target.value })
        }
        value={taskObj.description}
      />
      <Button
        cssClasses="item-save-button"
        id={`save-button-${id}`}
        onClick={() => setIsEditing(false)}
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
        href="/"
        title="Edit Task"
        onClick={(e) => {
          e.preventDefault();
          setIsEditing(true);
        }}
      >
        <img src={EditIcon} alt="Task Edit" className="task-edit" />
      </a>
      <div className="task-description">{taskObj.description}</div>
    </div>
  );
};

export default TaskBlock;
