import "./styles.css";
import TodoInput from "./components/todo-input";
import TodoList from "./components/todo-list";
import { createContext, useEffect } from "react";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";

export const TaskContext = createContext();

export default function App() {
  const [tasks, setTasks] = useState([]);
  const isFirstRender = useRef(true);
  function handleAdd(newTask) {
    if (tasks.filter((task) => task.text === newTask.text).length) {
      alert("Task already exists");
      return;
    }
    if (!newTask.text) {
      alert("Empty task");
      return;
    }
    setTasks((t) => [...t, newTask]);
  }

  useEffect(() => {
    if (!localStorage) return;
    let localTasks = localStorage.getItem("tasks");
    if (!localTasks) return;
    localTasks = JSON.parse(localTasks).tasks;
    setTasks(localTasks);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (localStorage) {
      localStorage.setItem("tasks", JSON.stringify({ tasks }));
    }
  }, [tasks]);

  function handleCompleteAll() {
    setTasks((tasks) => {
      let updatedTasks = tasks.map((task) => ({ ...task, isCompleted: true }));
      return updatedTasks;
    });
  }

  return (
    <div className="container">
      <TaskContext.Provider value={{ setTasks }}>
        <TodoInput add={handleAdd} />
        <TodoList tasks={tasks} />
      </TaskContext.Provider>
      {tasks.length > 1 ? (
        <div className="check-all">
          <button onClick={handleCompleteAll}>
            <FontAwesomeIcon icon={faCheckDouble} />
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
