import { auth, db } from '../firebaseInit.js';
import "./Tasks.css";

export default function Tasks() {
  return (
    <>
      <header id="top-bar">
        <div id="top-bar-content">
          <img className="icon" src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Google_Tasks_2021.svg" alt="tasksIcon" />
          <h2>Tasks</h2>
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
    </>
  )
}