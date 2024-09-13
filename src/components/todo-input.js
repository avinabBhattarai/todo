import { useState } from "react";

export default function TodoInput({ add }) {
  const [newTask, setNewTask] = useState("");
  function handleAdd() {
    add(newTask);
    setNewTask("");
  }
  return (
    <>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter new task ..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button className="add" onClick={handleAdd}>
          Add
        </button>
      </div>
    </>
  );
}
