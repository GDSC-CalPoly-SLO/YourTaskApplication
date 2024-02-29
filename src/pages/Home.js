import { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebaseInit.js';
import List from '../components/List.js';
import "./Home.css";
import { signOut } from 'firebase/auth';


export default function Tasks({ setLoggedIn }) {

  const userPath = doc(db, `users/${auth.currentUser.uid}`);

  const [lists, setLists] = useState([]);
  const [showSignout, setShowSignout] = useState(false);

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

  const addList = async () => {
    const newList = await addDoc(collection(userPath, "lists"), {
      name: "New List"
    });
    setLists([...lists, await getDoc(newList)]);
  }

  const deleteList = async (listRef) => {
    setLists(lists.filter(list => list.ref.id !== listRef.id));
    await deleteDoc(listRef);
  }

  const signout = async () => {
    try {
      await signOut(auth);
      console.log("signed out.")
    } catch (error) {
      alert("An error occured.")
    }
    setLoggedIn(false);
  }

  return (
    <>
      <header id="top-bar">
        <button id="top-bar-button">
          <img className="icon" src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Google_Tasks_2021.svg" alt="tasksIcon" />
          <h2>Checklists</h2>
        </button>
        <input
          id="search"
          name="search"
          type="text"
          className="search-bar"
          placeholder="Search"
        />
        <button
          id="top-bar-button"
          onClick={() => { setShowSignout(!showSignout); }}
        >
          <h2>{auth.currentUser.displayName}</h2>
          <img id="user-icon" className="icon" src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg" alt="userIcon" />
        </button>
      </header>
      {showSignout && <button
        id="sign-out"
        className="home-button"
        onClick={signout}
      >Sign out</button>}
      <section id="board">
        {lists.map((list) => (
          <List
            key={list.data().name}
            data={list.data()}
            listRef={list.ref}
            deleteList={deleteList}
          />
        ))}
        {lists.length === 0 &&
          <div>
            <h2>No tasks yet</h2>
            <p>Create a list to get started</p>
          </div>
        }
        <button
          id="add-list"
          className="home-button"
          onClick={addList}
        >+ Add new list</button>
      </section>
      <footer>

      </footer>
    </>
  )
}