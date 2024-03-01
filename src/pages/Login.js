import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth, db } from "../firebaseInit.js";
import { doc, setDoc } from "firebase/firestore";
import "./Login.css";

export default function Login({ setLoggedIn }) {
  const [signUp, setSignUp] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submit from reloading page
    const email = e.target.email.value;
    const pass = e.target.password.value;
    if (signUp) {
      try {
        await createUserWithEmailAndPassword(auth, email, pass);
        await updateProfile(auth.currentUser, {
          displayName: e.target.name.value
        });
        setLoggedIn(true);
      } catch (error) {
        error.code === "auth/email-already-in-use"
          ? alert("Email is already in use.")
          : alert("Sign up failed.");
      }
      // Create a document for the user
      await setDoc(doc(db, "users", auth.currentUser.uid), {});
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, pass);
        setLoggedIn(true);
      } catch (error) {
        alert("Login failed.");
      }
    }
  };

  const toggleSignUp = () => {
    setSignUp(!signUp);
  };

  return (
    <div className="wrapper">
      <div className="container">
        <h1>Checklists</h1>
        <img id="checklistsIcon" src="https://cdn-icons-png.flaticon.com/512/2644/2644923.png" />
        <form id="login-form" onSubmit={handleLogin}>
          {signUp &&
            <div className="input-wrapper">
              <label htmlFor="name" id="name-label" className="label">Name </label>
              <input
                id="name"
                name="name"
                type="text"
                className="input"
                placeholder="Display Name"
              />
            </div>
          }
          <div className="input-wrapper">
            <label htmlFor="email" id="email-label" className="label">Email </label>
            <input
              id="email"
              name="email"
              type="email"
              className="input"
              placeholder="Email"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password" id="pass-label" className="label">Password </label>
            <input
              id="password"
              name="password"
              type="password"
              className="input"
              placeholder="Password"
            />
          </div>
          <input
            id="submit"
            type="submit"
            value={signUp ? "Sign Up" : "Sign In"}
          />
        </form>
        <p>{signUp ? "Already" : "Don't"} have an account? <a id="sign-up" onClick={toggleSignUp}>Sign {signUp ? "in" : "up"}</a></p>
      </div>
    </div>
  );
}