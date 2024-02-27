import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, getDoc, getDocs } from "firebase/firestore";
import Task from "./Task.js";
import "./List.css";

export default function List({ data, listRef }) {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    readTasks();
  }, []);

  const readTasks = async () => {
    let listTasks = [];
    const query = await getDocs(collection(listRef, "tasks"));
    query.forEach((doc) => {
      listTasks = [...listTasks, doc];
    })
    setTasks(listTasks);
  }

  const addTask = async () => {
    const newTask = await addDoc(collection(listRef, "tasks"), {
      completed: false,
      date: "",
      details: "",
      name: "New task"
    });
    setTasks([...tasks, await getDoc(newTask)]);
  }

  const deleteTask = async (taskRef) => {
    setTasks(tasks.filter(task => task.ref.id != taskRef.id));
    await deleteDoc(taskRef);
  }

  return (
    <div className="list-container">
      <h3 id="list-name">{data.name}</h3>
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