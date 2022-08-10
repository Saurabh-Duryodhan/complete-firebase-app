import React from "react";
import { useState, useEffect } from "react";
import { app, database } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
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

  const collectionRef = collection(database, "users");

  const [userInput, setUserInput] = useState("");
  const [data, setData] = useState();
  const [allUsers, setALlUsers] = useState([]);
  const [updateField, setUpdateField] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
    setData({ ...data, ...userInput });
  };

  const handleUpdateField = (e) => {
    const { name, value } = e.target;
    setUpdateField({ ...updateField, [name]: value });
    console.log(updateField);
  };

  const handleSignUp = async (e) => {
    const { email, password } = data;
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      const saveUser = await addDoc(collectionRef, { ...data }).then(() => {
        try {
          signInWithEmailAndPassword(auth, email, password).then(() => {
            console.log("user signed in");
          });
        } catch (error) {
          console.log(error.message);
        }
        alert("User created successfully");
      });
      console.log(saveUser);
    } catch (err) {
      alert(err.message);
    }
  };

  const playSnapshot = async () => {
    onSnapshot(collectionRef, (data) => {
      console.log(
        data.docs.map((item) => {
          return item.data();
        })
      );
    });
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

  const addUserToDatabase = (e) => {
    try {
      addDoc(collectionRef, { ...data }).then(() =>
        alert(`Data added to database`)
      );
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

  const getUserData = async (e) => {
    getDocs(collectionRef).then((response) => {
      setALlUsers(
        response.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  };

  const updateEmail = (e) => {
    e.preventDefault();
    const { email } = updateField;
    const docToBeUpdate = doc(collectionRef, "oWCophKjURlSmS3kYmjl");
    updateDoc(docToBeUpdate, { email }).then(() => {
      alert(`User updated`);
    });
  };

  const dataDelete = (e) => {
    e.preventDefault();
    const docToBeDelete = doc(collectionRef, "oWCophKjURlSmS3kYmjl");
    deleteDoc(docToBeDelete).then(() => {
      alert(`User deleted`);
    });
  };

  useEffect(() => {
    playSnapshot();
  }, []);

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

        <button type="submit" onClick={(e) => addUserToDatabase(e)}>
          Save User
        </button>

        <button type="submit" onClick={(e) => getUserData(e)}>
          Get All Users
        </button>
        <br />
        <br />
        <input
          type="email"
          placeholder="update your email"
          name="email"
          onChange={(e) => handleUpdateField(e)}
        />
        <button type="submit" onClick={(e) => updateEmail(e)}>
          Update email
        </button>
      </div>
      {allUsers.map((item) => {
        return (
          <div key={item.key}>
            <h2>{item.email}</h2>
          </div>
        );
      })}
      <button type="submit" onClick={(e) => dataDelete(e)}>
        Delete User
      </button>

      <button onClick={(e) => playSnapshot(e)}>Play Snapshot</button>
    </div>
  );
};

export default App;
