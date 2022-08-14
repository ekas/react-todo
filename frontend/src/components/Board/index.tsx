import BoardItem from "../BoardItem";
import "./index.less";

const Board = () => {
  return (
    <div className="board">
      <div className="board-header">
        <h2>TO DO List</h2>
        <span>This week</span>
      </div>
      <div className="board-content">
        <BoardItem items={[]} heading="To Do" />
        <BoardItem items={[]} heading="In Progress" />
        <BoardItem items={[]} heading="Completed" />
      </div>
    </div>
  );
};

export default Board;
