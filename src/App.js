import { useState, useEffect } from "react";
import "./App.css";
import firebase from "firebase";
import { db } from "./firebase_config";
import TodoListItem from "./Todo";
import Login from "./Login";

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [userId, setUserId] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    getTodos();
  }, [userId]);

  const getTodos = () => {
    db.collection(`todos_${userId}`).onSnapshot(function (querySnapshot) {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          inprogress: doc.data().inprogress,
          start_Date: doc.data().start_Date,
        }))
      );
    });
  };

  const addTodo = (e) => {
    e.preventDefault();

    if (todoInput === "") {
      return;
    }

    var x = firebase.firestore.Timestamp.fromDate(new Date())
      .toDate()
      .toDateString()
      .substring(4);
    setCreatedAt(x);

    db.collection(`todos_${userId}`).add({
      inprogress: true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: todoInput,
      start_Date: createdAt,
    });

    setTodoInput("");
  };

  //For Authentication
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState("");

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = () => {
    clearErrors();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
          default:
            break;
        }
      });
  };

  const handleSignup = () => {
    clearErrors();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
          default:
            break;
        }
      });
  };

  const handleLogout = () => {
    setUserId("");
    firebase.auth().signOut();
  };

  useEffect(() => {
    authListener();
  }, []);

  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        clearInputs();
        setUserId(user.uid);
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  //end of authentication

  return (
    <div>
      {user ? (
        <div className="App">
          <button className="logout-button" onClick={handleLogout}>
            LogOut
          </button>
          <h1>To-do App</h1>
          <form className="todo-form">
            <input
              type="text"
              autoFocus
              placeholder="Add a To-do"
              className="todo-input"
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
            />
            <button type="submit" onClick={addTodo} className="todo-button">
              Add Todo
            </button>
          </form>
          {todos.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo.todo}
              inprogress={todo.inprogress}
              id={todo.id}
              userid={userId}
              start_Date={todo.start_Date}
            />
          ))}
        </div>
      ) : (
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError}
        />
      )}
    </div>
  );
}

export default App;
