import { useEffect, useState } from "react";
import { Timestamp, addDoc, collection, deleteDoc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import Task from "./Task.js";
import "./List.css";

export default function List({ data, listRef, deleteList }) {

  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [listName, setListName] = useState(data.name);

  useEffect(() => {
    readTasks();
  }, []);

  const exitEditMode = (e) => {
    setEditMode(false);
    updateDoc(listRef, {
      name: e.target.name.value
    });
  }

  const readTasks = async () => {
    let listTasks = [];
    const query = await getDocs(collection(listRef, "tasks"));
    query.forEach((doc) => {
      listTasks = [...listTasks, doc];
      console.log(doc.data());
      console.log(doc.data().date);
    })
    setTasks(listTasks);
  }

  const addTask = async () => {
    const newTask = await addDoc(collection(listRef, "tasks"), {
      completed: false,
      date: Timestamp.now(),
      details: "",
      name: "New task"
    });
    setTasks([...tasks, await getDoc(newTask)]);
  }

  const deleteTask = async (taskRef) => {
    setTasks(tasks.filter(task => task.ref.id !== taskRef.id));
    // check ==! if something goes wrong with delete
    await deleteDoc(taskRef);
  }

  return (
    <div className="list-container">
      <div className="list-section fill">
        {editMode
          ? <form className="list-section fill" onSubmit={exitEditMode}>
            <div className="fill">
              <input autoFocus
                id="name"
                type="text"
                className="list-input"
                value={listName}
                placeholder="Name"
                onChange={(e) => { setListName(e.target.value); }}
              />
            </div>
            <button
              id="submit"
              type="submit"
              className="list-section-btn"
            ><span className="fa-solid fa-floppy-disk" /></button>
          </form>
          : <>
            <div className="fill">
              <h3 id="list-name">{listName}</h3>
            </div>
            <button
              id="edit"
              className="list-section-btn"
              onClick={() => { setEditMode(true); }}
            ><span className="fa-solid fa-pen" /></button>
          </>
        }
        {/* <div className="fill">
          <h3 id="list-name">{data.name}</h3>
        </div>
        <button
          id="edit"
        ><span className="fa-solid fa-pen" /></button> */}
        <button
          id="delete"
          className="list-section-btn"
          onClick={() => { deleteList(listRef); }}
        ><span className="fa-solid fa-trash" /></button>
      </div>
      {tasks.map((task) => (
        <Task
          key={task.ref.id}
          data={task.data()}
          taskRef={task.ref}
          deleteTask={deleteTask}
        />
      ))}
      <button
        id="add-task-button"
        onClick={addTask}
      ><span className="fa-solid fa-plus"></span>Add a task</button>
    </div>
  )
}