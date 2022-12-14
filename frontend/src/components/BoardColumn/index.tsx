import { DroppableProvidedProps } from "react-beautiful-dnd";
import { addTaskJSON, getUniqueID } from "../../helpers/boardHelper";
import { Task } from "../../models/task";
import Button from "../Button";

import "./index.less";

interface BoardColumnProps {
  id: string;
  tasksLength: number;
  heading: string;
  type: "todo" | "inprogress" | "completed";
  children?: React.ReactNode[];
  reference: React.LegacyRef<HTMLDivElement> | undefined;
  style?: React.CSSProperties;
  props?: DroppableProvidedProps;
  showAddButton?: boolean;
  addUpdateTaskAction: (task: Task, type: "ADD" | "UPDATE") => void;
}

const BoardColumn = ({
  id,
  tasksLength = 0,
  heading,
  type,
  children,
  reference,
  style,
  props,
  showAddButton = false,
  addUpdateTaskAction,
}: BoardColumnProps) => {
  return (
    <div
      className="board-content-item"
      data-cy={`board-content-item-${id}`}
      ref={reference}
      style={style}
      {...props}
    >
      <div className="item-header">
        <span>{heading}</span>
        <span className="item-header-number">{tasksLength}</span>
      </div>
      {showAddButton && (
        <Button
          cssClasses="item-add-button"
          id={`add-button-${type}`}
          onClick={() => {
            addUpdateTaskAction({ ...addTaskJSON, id: getUniqueID() }, "ADD");
          }}
        >
          +
        </Button>
      )}
      <div className="item-content">{children}</div>
    </div>
  );
};

export default BoardColumn;
