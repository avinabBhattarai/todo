import { useContext, useState } from "react";
import { TaskContext } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faUndo } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function TodoCard({ task }) {
  const [edit, setEdit] = useState(task.text);
  const [isEdit, setIsEdit] = useState(false);
  const { setTasks } = useContext(TaskContext);
  function handleDelete() {
    setTasks((tasks) => tasks.filter((t) => task.id !== t.id));
  }
  function handleEdit() {
    setIsEdit(true);
  }
  function handleCheck() {
    setTasks((tasks) => {
      const updatedTasks = tasks.map((t) =>
        t.id === task.id ? { ...t, isCompleted: !t.isCompleted } : t
      );
      return updatedTasks;
    });
  }
  return (
    <>
      {isEdit ? (
        <li className="task">
          <input
            type="text"
            placeholder="task"
            value={edit}
            onChange={(e) => setEdit(e.target.value)}
          />
          <button
            onClick={() => {
              setTasks((tasks) => {
                if (
                  tasks.filter((t) => t.text === edit).length &&
                  task.text !== edit
                ) {
                  alert("Task already exists!");
                  setEdit(task.text);
                  return tasks;
                } else if (edit === "") {
                  alert("Task cannot be empty!");
                  setEdit(task.text);
                  return tasks;
                } else {
                  return tasks.map((t) =>
                    task.id === t.id ? { ...task, text: edit } : t
                  );
                }
              });
              setIsEdit(false);
            }}
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </li>
      ) : (
        <li className="task">
          {!task.isCompleted ? (
            <>
              <span>{task.text}</span>
              <button onClick={handleEdit}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button onClick={handleCheck}>
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </>
          ) : (
            <>
              <span style={{ textDecoration: "line-through" }}>
                {task.text}
              </span>
              <button onClick={handleCheck}>
                <FontAwesomeIcon icon={faUndo} />
              </button>
            </>
          )}

          <button onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </li>
      )}
    </>
  );
}
