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
  const [completedTasks, setCompletedTasks] = useState([]);
  const isFirstRender = useRef(true);
  function handleAdd(newTask) {
    if (tasks.includes(newTask)) {
      alert("Task already exists");
      return;
    }
    if (!newTask) {
      alert("Empty task");
      return;
    }
    setTasks((t) => [...t, newTask]);
  }

  useEffect(() => {
    if (!localStorage) return;
    let localTasks = localStorage.getItem("tasks");
    if (!localTasks) return;
    let localCompletedTasks = JSON.parse(localTasks).completedTasks;
    localTasks = JSON.parse(localTasks).tasks;
    setTasks(localTasks);
    setCompletedTasks(localCompletedTasks);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (localStorage) {
      localStorage.setItem("tasks", JSON.stringify({ tasks, completedTasks }));
    }
  }, [tasks, completedTasks]);

  function handleCompleteAll() {
    setCompletedTasks(tasks);
  }

  return (
    <div className="container">
      <TaskContext.Provider
        value={{ setTasks, setCompletedTasks, completedTasks }}
      >
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
