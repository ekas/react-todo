import BoardItem from "../BoardItem";
import TaskBlock from "../TaskBlock";
import "./index.less";

const Board = () => {
  return (
    <div className="board">
      <div className="board-header">
        <h2>TO DO List</h2>
        <span>This week</span>
      </div>
      <div className="board-content">
        <BoardItem tasksLength={0} heading="To Do" type="todo">
          <>
            <TaskBlock
              mode="read"
              task={{
                id: 1,
                title: "Task 1",
                description: "Task 1 description",
              }}
            />
          </>
        </BoardItem>
        <BoardItem
          tasksLength={0}
          heading="In Progress"
          type="inprogress"
        ></BoardItem>
        <BoardItem
          tasksLength={0}
          heading="Completed"
          type="completed"
        ></BoardItem>
      </div>
    </div>
  );
};

export default Board;
