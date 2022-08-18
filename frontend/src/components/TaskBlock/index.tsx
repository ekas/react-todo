import { useState } from "react";
import {
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
  const [validationErrors, setValidationErrors] = useState({
    title: false,
    description: false,
  });

  return isEditing ? (
    <div
      className="task"
      ref={reference}
      {...dragHandleProps}
      {...draggableProps}
      data-cy={`task-${id}`}
      style={{ ...style }}
    >
      <input
        type="text"
        className="task-title-input"
        id={`${id}-title`}
        data-cy="task-edit-input"
        required
        value={taskObj.title}
        onChange={(e) => setTaskObj({ ...taskObj, title: e.target.value })}
        placeholder="Enter Task Title"
      />
      <div className="task-title-error">
        {validationErrors.title && "Title is required"}
      </div>

      <textarea
        id={`${id}-description`}
        data-cy="task-edit-textarea"
        className="task-description-input"
        required
        placeholder="Enter Task Description"
        onChange={(e) =>
          setTaskObj({ ...taskObj, description: e.target.value })
        }
        value={taskObj.description}
      />
      <div className="task-description-error">
        {validationErrors.description && "Description is required"}
      </div>

      <Button
        cssClasses="item-save-button"
        id={`save-button-${id}`}
        dataCy="task-edit-save"
        onClick={() => {
          const { title, description } = taskObj;
          if (title.length > 0 && description.length > 0) {
            addUpdateTaskAction(taskObj, "UPDATE");
            setIsEditing(false);
            setValidationErrors({ title: false, description: false });
          }

          if (title.length === 0 && description.length === 0) {
            setValidationErrors({
              title: true,
              description: true,
            });
          } else if (description.length === 0) {
            setValidationErrors({
              description: true,
              title: false,
            });
          } else if (title.length === 0) {
            setValidationErrors({
              title: true,
              description: false,
            });
          }
        }}
      >
        Save Task
      </Button>
    </div>
  ) : (
    <div
      className="task"
      data-cy={`task-${id}`}
      ref={reference}
      {...dragHandleProps}
      {...draggableProps}
    >
      <div className="task-title" title={taskObj.title}>
        {taskObj.title}
      </div>
      <button
        title="Edit Task"
        id={`edit-button-${id}`}
        className="task-edit"
        onClick={(e) => {
          e.preventDefault();
          setIsEditing(true);
        }}
      >
        <img src={EditIcon} alt="Task Edit" className="task-edit-img" />
      </button>
      <button
        title="Delete Task"
        id={`delete-button-${id}`}
        className="task-delete"
        onClick={(e) => {
          e.preventDefault();
          deleteTaskAction(taskObj.id);
        }}
      >
        <img src={DeleteIcon} alt="Delete Task" className="task-delete-img" />
      </button>
      <div className="task-description">{taskObj.description}</div>
    </div>
  );
};

export default TaskBlock;
