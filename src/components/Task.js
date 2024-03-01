import { useEffect, useState } from "react";
import { Timestamp, updateDoc } from "firebase/firestore";
import "./Task.css";

export default function Task({ data, taskRef, deleteTask }) {

  const [editMode, setEditMode] = useState(false);
  const [editStyle, setEditStyle] = useState({});
  const [completed, setCompleted] = useState(data.completed);
  const [checked, setChecked] = useState("");
  const [striked, setStriked] = useState({});
  const [taskName, setTaskName] = useState(data.name);
  const [taskDetails, setTaskDetails] = useState(data.details);
  const [taskDate, setTaskDate] = useState("");

  useEffect(() => {
    setTaskDate(getDateUSA(data.date.toDate().toISOString().slice(0, 10)));
    if (completed) {
      setChecked("fa-solid fa-square-check blue");
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
      setChecked("fa-solid fa-square-check blue");
      setStriked({
        textDecoration: "line-through",
        color: "#686c71"
      });
      updateDoc(taskRef, { completed: true });
    }
    setCompleted(!completed);
  }

  const enterEditMode = () => {
    setTaskDate(getDateISO(taskDate));
    setEditStyle({
      backgroundColor: "#F6F8F9",
      boxShadow: "0 1px 4px hsl(0, 0%, 75%)"
    });
    setEditMode(true);
  }

  const exitEditMode = () => {
    setEditStyle({});
    setEditMode(false);
    const date = Timestamp.fromDate(new Date(taskDate));
    // Write changes to the database
    updateDoc(taskRef, {
      name: taskName,
      details: taskDetails,
      date: Timestamp.fromDate(new Date(taskDate))
    });
    // Set the display date back to USA format after updating
    setTaskDate(getDateUSA(taskDate));
  }

  const getDateISO = (dateUSA) => {
    let date = `${dateUSA.slice(6, 11)}-${dateUSA.slice(0, 2)}-${dateUSA.slice(3, 5)}`;
    return date;
  }

  const getDateUSA = (dateISO) => {
    return `${dateISO.slice(5, 7)}/${dateISO.slice(8, 10)}/${dateISO.slice(0, 4)}`;
  }

  return (
    <div className="task" style={editStyle}>
      <div className="task-section fill">
        <button
          id="complete"
          onClick={toggleCompleted}
        ><span className={checked} /></button>
        {editMode
          ? <form className="task-info fill" onSubmit={exitEditMode}>
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
            <input
              id="date"
              type="date"
              className="sub-input date"
              value={taskDate}
              onChange={(e) => { setTaskDate(e.target.value); }}
            />
            <input
              type="submit"
              style={{ display: "none" /* enables form submit on "enter" */ }}
            />
            <p className="sub-text">Click to change values</p>
          </form>
          : <div className="task-info fill">
            <p className="main-text" style={striked}>{taskName}</p>
            {completed ||
              <>
                <p className="sub-text">{taskDetails}</p>
                <p className="sub-text date">{taskDate}</p>
              </>
            }
          </div>
        }
      </div>
      <div className="task-section">
        {completed || (editMode
          ? <button
            id="save"
            onClick={exitEditMode}
          ><span className="fa-solid fa-floppy-disk" /></button>
          : <button
            id="edit"
            className="hidden"
            onClick={enterEditMode}
          ><span className="fa-solid fa-pen" /></button>
        )}
        <button
          id="delete"
          className="hidden"
          onClick={() => { deleteTask(taskRef) }}
        ><span className="fa-solid fa-trash" /></button>
      </div>
    </div>
  )
}