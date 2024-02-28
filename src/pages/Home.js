import { useEffect, useState } from 'react';
import { collection, doc, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebaseInit.js';
import List from '../components/List.js';
import "./Home.css";


export default function Tasks() {

  const userPath = doc(db, `users/${auth.currentUser.uid}`);

  const [lists, setLists] = useState([]);

  useEffect(() => {
    readLists();
  }, [])

  const readLists = async () => {
    let userLists = []
    const query = await getDocs(collection(userPath, "lists"));
    query.forEach((doc) => {
      userLists = [...userLists, doc];
    });
    setLists(userLists);
  }

  return (
    <>
      <header id="top-bar">
        <div id="top-bar-content">
          <img className="icon" src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Google_Tasks_2021.svg" alt="tasksIcon" />
          <h2>Checklists</h2>
        </div>
        <input
          id="search"
          name="search"
          type="text"
          className="search-bar"
          placeholder="Search"
        />
        <div id="top-bar-content">
          <h2>{auth.currentUser.displayName}</h2>
          <img id="user-icon" className="icon" src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg" alt="userIcon" />
        </div>
      </header>
      <section id="board">
        {lists.map((list) => (
          <List
            key={list.data().name}
            data={list.data()}
            listRef={list.ref}
          />
        ))}
        {lists.length === 0 &&
          <div>
            <h2>No tasks yet</h2>
            <p>Create a list to get started</p>
          </div>
        }
        <button
          id="add-list-button"
        >+ Add new list</button>
      </section>
    </>
  )
}