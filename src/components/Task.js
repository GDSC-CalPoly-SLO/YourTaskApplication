import { useEffect, useState } from "react";
import "./Task.css";

export default function Task({ task }) {

  const [editMode, setEditMode] = useState(false);
  const [editStyle, setEditStyle] = useState({});

  const [completed, setCompleted] = useState(task.completed);
  const [checked, setChecked] = useState("");
  const [striked, setStriked] = useState({});
  const [taskName, setTaskName] = useState(task.name);
  const [taskDetails, setTaskDetails] = useState(task.details);
  // const [taskDate, setTaskDate] = useState("Date");

  useEffect(() => {
    /* completed ? setChecked("fa-solid fa-square-check")
      : setChecked("fa-regular fa-square"); */
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
  }

  const toggleCompleted = () => {
    if (completed) {
      setChecked("fa-regular fa-square");
      setStriked({});
    } else {
      setChecked("fa-solid fa-square-check");
      setStriked({
        textDecoration: "line-through",
        color: "#686c71"
      });
    }
    setCompleted(!completed)
    // write to database
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
            <input
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
              type="text"
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
        <button id="delete"><span className="fa-solid fa-trash"></span></button>
      </div>
    </div>
  )
}