import { DroppableProvidedProps } from "react-beautiful-dnd";
import Button from "../Button";

import "./index.less";

interface BoardColumnProps {
  tasksLength: number;
  heading: string;
  type: "todo" | "inprogress" | "completed";
  children?: React.ReactNode[];
  reference: React.LegacyRef<HTMLDivElement> | undefined;
  style?: React.CSSProperties;
  props?: DroppableProvidedProps;
  showAddButton?: boolean;
}

const BoardColumn = ({
  tasksLength = 0,
  heading,
  type,
  children,
  reference,
  style,
  props,
  showAddButton = false,
}: BoardColumnProps) => {
  return (
    <div
      className="board-content-item"
      ref={reference}
      style={style}
      {...props}
    >
      <div className="item-header">
        <span>{heading}</span>
        <span className="item-header-number">{tasksLength}</span>
      </div>
      {showAddButton && (
        <Button cssClasses="item-add-button" id={`add-button-${type}`}>
          +
        </Button>
      )}
      <div className="item-content">{children}</div>
    </div>
  );
};

export default BoardColumn;
