import TodoCard from "./todo-card";
import crc32 from "crc-32";
export default function TodoList({ tasks }) {
  return (
    <>
      <div className="list">
        {tasks.map((task) => {
          return <TodoCard key={crc32.str(task)} task={task} />;
        })}
      </div>
    </>
  );
}
