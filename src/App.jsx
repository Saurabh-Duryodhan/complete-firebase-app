import React from "react";
import { useState, useEffect } from "react";
import { app } from "./firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
const App = () => {
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const gitProvider = new GithubAuthProvider();
  const [userInput, setUserInput] = useState("");
  const [data, setData] = useState();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
    setData({ ...data, ...userInput });
  };

  const handleSignUp = async (e) => {
    const { email, password } = data;
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (err) {
      alert(err.message);
    }
  };

  const SignInWithGoogle = () => {
    try {
      const googleSignIn = signInWithPopup(auth, googleProvider);
      console.log(googleSignIn);
    } catch (error) {
      alert(error.message);
    }
  };

  const SignInWithGithub = (e) => {
    try {
      const gitSignIn = signInWithPopup(auth, gitProvider);
      console.log(gitSignIn);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <div>
        <h1>Firebase Authentication</h1>
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          onChange={(e) => handleInput(e)}
        />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => handleInput(e)}
        />
        <br />
        <button type="submit" onClick={(e) => handleSignUp(e)}>
          Signup
        </button>
        <button type="submit" onClick={(e) => handleSignIn(e)}>
          Signin
        </button>

        <button type="submit" onClick={(e) => SignInWithGoogle(e)}>
          Google SignIn
        </button>

        <button type="submit" onClick={(e) => SignInWithGithub(e)}>
          GitHub SignIn
        </button>
      </div>
    </div>
  );
};

export default App;
