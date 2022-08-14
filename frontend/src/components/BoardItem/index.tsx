import { Item } from "../../models/item";
import "./index.less";
type BoardItemProps = {
  items: Item[];
  heading: string;
};

const BoardItem = ({ items, heading }: BoardItemProps) => {
  return (
    <div className="board-content-item">
      <div className="item-header">
        <span>{heading}</span>
        <span className="item-number">{items.length}</span>
      </div>
    </div>
  );
};

export default BoardItem;
