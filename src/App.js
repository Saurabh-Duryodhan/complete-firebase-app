import React from "react";
import { useState, useEffect } from "react";
import { app, database, storage } from "./firebaseConfig";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
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
  const [profile, setProfile] = useState();
  const [progressPercentage, setProgressPercentage] = useState(0);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
    setData({ ...data, ...userInput });
  };

  const handleFileInput = (e) => {
    // const fileRef = ref(storage, profile.name);
    // uploadBytes(fileRef, profile).then((snapshot) => {
    //   // e.target[0].value = "";
    //   getDownloadURL(snapshot.ref).then((downloadURL) => {
    //     console.log(downloadURL);
    //   });
    // });

    const fileRef = ref(storage, profile.name);
    const uploadTask = uploadBytesResumable(fileRef, profile);
    uploadTask.on("state_changed", (snapshot) => {
      const progress = setProgressPercentage(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      console.log(`File progress: ${progressPercentage}% done`);
    });
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
      <input
        type="file"
        name="profileImage"
        onChange={(e) => setProfile(e.target.files[0])}
      />
      <button type="submit" onClick={(e) => handleFileInput(e)}>
        Upload file
      </button>
      <br />
      <div
        style={{
          height: "200px",
          backgroundColor: "lightgray",
          padding: "1.5rem",
          marginTop: "2rem",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          width: "60%",
          justifyContent: "center",
        }}
      >
        <h1>File Progress:</h1>
        <progress
          style={{ color: "red", width: "100%" }}
          value={progressPercentage}
          max="100"
        ></progress>
      </div>
    </div>
  );
};

export default App;
