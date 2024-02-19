import { useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { auth, db } from "../firebaseInit";
import Task from "./Task";
import "./List.css";

export default function List({ list }) {

  const [tasks, setTasks] = useState([]);
  const listPath = list.name.replace(/ /g, '').toLowerCase();
  const listData = doc(db, `users/${auth.currentUser.uid}/lists/${listPath}`)

  useEffect(() => {
    readTasks();
  }, [])

  async function readTasks() {
    let listTasks = [];
    const querySnapshot = await getDocs(collection(listData, "tasks"));
    querySnapshot.forEach((doc) => {
      listTasks = [...listTasks, doc.data()];
    })
    setTasks(listTasks);
  }

  return (
    <div className="list-container">
      <h3 id="list-name">{list.name}</h3>
      {tasks.map((task) => (
        <Task key={task.name} task={task} />
      ))}
      <p id="add-task-button"><span className="fa-solid fa-plus"></span>Add a task</p>
    </div>
  )
}