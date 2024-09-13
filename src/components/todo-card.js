import { useContext, useState, useEffect } from "react";
import { TaskContext } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faUndo } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function TodoCard({ task }) {
  const [edit, setEdit] = useState(task);
  const [isComplete, setIsComplete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { setTasks, setCompletedTasks, completedTasks } =
    useContext(TaskContext);
  function handleDelete() {
    setTasks((t) => t.filter((itask) => task !== itask));
    setCompletedTasks((c) => c.filter((t) => t !== task));
  }
  function handleEdit() {
    setIsEdit(true);
  }
  function handleCheck() {
    if (!isComplete) {
      setCompletedTasks((c) => [...c, task]);
    } else {
      setCompletedTasks((c) => c.filter((t) => t !== task));
    }
    setIsComplete((i) => !i);
  }
  useEffect(() => {
    if (completedTasks.includes(task)) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [completedTasks, task]);
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
              setTasks((t) => {
                if (t.includes(edit) && task !== edit) {
                  alert("Task already exists!");
                  setEdit(task);
                  return t;
                } else {
                  return t.map((itask) => (task === itask ? edit : itask));
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
          {!isComplete ? (
            <>
              <span>{task}</span>
              <button onClick={handleEdit}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button onClick={handleCheck}>
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </>
          ) : (
            <>
              <span style={{ textDecoration: "line-through" }}>{task}</span>
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
