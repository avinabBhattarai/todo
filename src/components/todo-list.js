import TodoCard from "./todo-card";
export default function TodoList({ tasks }) {
  return (
    <>
      <div className="list">
        {tasks.map((task) => {
          return <TodoCard key={task.id} task={task} />;
        })}
      </div>
    </>
  );
}
