import { Item } from "../../models/item";
import Button from "../Button";
import "./index.less";
type BoardItemProps = {
  items: Item[];
  heading: string;
  type: "todo" | "inprogress" | "completed";
};

const BoardItem = ({ items, heading, type }: BoardItemProps) => {
  return (
    <div className="board-content-item">
      <div className="item-header">
        <span>{heading}</span>
        <span className="item-header-number">{items.length}</span>
      </div>
      <Button cssClasses="item-add-button" id={`add-button-${type}`}>
        +
      </Button>
    </div>
  );
};

export default BoardItem;
