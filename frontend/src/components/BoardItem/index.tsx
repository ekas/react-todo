import { ReactElement } from "react";
import Button from "../Button";

import "./index.less";

interface BoardItemProps {
  tasksLength: number;
  heading: string;
  type: "todo" | "inprogress" | "completed";
  children?: ReactElement;
}

const BoardItem = ({
  tasksLength = 0,
  heading,
  type,
  children,
}: BoardItemProps) => {
  return (
    <div className="board-content-item">
      <div className="item-header">
        <span>{heading}</span>
        <span className="item-header-number">{tasksLength}</span>
      </div>
      <Button cssClasses="item-add-button" id={`add-button-${type}`}>
        +
      </Button>
      <div className="item-content">{children}</div>
    </div>
  );
};

export default BoardItem;
