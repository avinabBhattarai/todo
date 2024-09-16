import { useState } from "react";
import crc32 from "crc-32";

export default function TodoInput({ add }) {
  const [newTask, setNewTask] = useState("");
  function handleAdd() {
    add({
      id: crc32.str(newTask),
      text: newTask,
      isCompleted: false,
    });
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
