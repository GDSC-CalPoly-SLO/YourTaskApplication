import { useEffect, useState } from "react";
import { updateDoc } from "firebase/firestore";
import "./Task.css";

export default function Task({ data, taskRef, deleteTask }) {

  const [editMode, setEditMode] = useState(false);
  const [editStyle, setEditStyle] = useState({});
  const [completed, setCompleted] = useState(data.completed);
  const [checked, setChecked] = useState("");
  const [striked, setStriked] = useState({});
  const [taskName, setTaskName] = useState(data.name);
  const [taskDetails, setTaskDetails] = useState(data.details);
  // const [taskDate, setTaskDate] = useState(data.date);

  useEffect(() => {
    if (completed) {
      setChecked("fa-solid fa-square-check");
      setStriked({
        textDecoration: "line-through",
        color: "#686c71"
      });
    } else {
      setChecked("fa-regular fa-square");
      setStriked({});
    }
  }, []);

  const toggleCompleted = () => {
    if (completed) {
      setChecked("fa-regular fa-square");
      setStriked({});
      updateDoc(taskRef, { completed: false });
    } else {
      setChecked("fa-solid fa-square-check");
      setStriked({
        textDecoration: "line-through",
        color: "#686c71"
      });
      updateDoc(taskRef, { completed: true });
    }
    setCompleted(!completed);
  }

  const enterEditMode = () => {
    setEditStyle({
      backgroundColor: "#F6F8F9",
      boxShadow: "0 1px 4px hsl(0, 0%, 75%)"
    });
    setEditMode(true);
  }

  const exitEditMode = () => {
    setEditStyle({});
    setEditMode(false);
    // write to database
    updateDoc(taskRef, {
      name: taskName,
      details: taskDetails
    });
  }

  return (
    <div className="task" style={editStyle}>
      <div className="task-section fill">
        <button
          id="complete"
          onClick={toggleCompleted}
        ><span className={checked}></span></button>
        {editMode
          ? <form className="task-info fill">
            <input autoFocus
              type="text"
              className="main-input"
              value={taskName}
              placeholder="Name"
              onChange={(e) => { setTaskName(e.target.value); }}
            />
            <input
              type="text"
              className="sub-input"
              value={taskDetails}
              placeholder="Details"
              onChange={(e) => { setTaskDetails(e.target.value); }}
            />
            {/* <input
              type="date"
              className="sub-input"
              value={taskDate}
              onChange={(e) => { setTaskDate(e.target.value); }}
            /> */}
            <p className="sub-text">Click to change values</p>
          </form>
          : <div className="task-info fill">
            <p className="main-text" style={striked}>{taskName}</p>
            {completed ||
              <p className="sub-text">{taskDetails}</p>
              /* <p className="sub-text">{taskDate}</p> */
            }
          </div>
        }
      </div>
      <div className="task-section">
        {completed || (editMode
          ? <button
            id="save"
            onClick={exitEditMode}
          ><span className="fa-solid fa-floppy-disk"></span></button>
          : <button
            id="edit"
            onClick={enterEditMode}
          ><span className="fa-solid fa-pen"></span></button>
        )}
        <button
          id="delete"
          onClick={/* deleteTask.bind(null, taskRef) */
            () => { deleteTask(taskRef) }
            /* test to make sure the above actually works */
          }
        ><span className="fa-solid fa-trash"></span></button>
      </div>
    </div>
  )
}