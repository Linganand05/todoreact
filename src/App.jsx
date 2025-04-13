import React, { useState } from "react";
import { FaTrash, FaCheck, FaEdit } from "react-icons/fa";

// 🌟 Header Component - Displays the main title
const Header = () => {
  return (
    <h1
      style={{
        fontSize: "30px",
        fontWeight: "bold",
        marginBottom: "20px",
        color: "#2c3e50",
      }}
    >
      📝 My To-Do List
    </h1>
  );
};

// ✅ ToDoItem Component - Represents a single task item
const ToDoItem = ({ task, toggleComplete, deleteTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = () => {
    if (newText.trim() !== "") {
      editTask(task.id, newText);
      setIsEditing(false);
    }
  };

  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        marginBottom: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: task.completed ? "#e6f4ea" : "#ffffff",
        boxShadow: "2px 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      {isEditing ? (
        <input
          type="text"
          style={{
            flex: "1",
            padding: "6px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      ) : (
        <span
          style={{
            flex: "1",
            fontSize: "16px",
            color: "#2d3436",
            textDecoration: task.completed ? "line-through" : "none",
          }}
        >
          {task.text || "No text available"}
        </span>
      )}

      <div style={{ display: "flex", gap: "10px" }}>
        {isEditing ? (
          <button
            style={{
              color: "blue",
              fontSize: "18px",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
            onClick={handleEdit}
          >
            ✔
          </button>
        ) : (
          <button
            style={{
              color: "orange",
              fontSize: "18px",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
            onClick={() => setIsEditing(true)}
          >
            <FaEdit />
          </button>
        )}
        <button
          style={{
            color: "green",
            fontSize: "18px",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
          onClick={() => toggleComplete(task.id)}
        >
          <FaCheck />
        </button>
        <button
          style={{
            color: "red",
            fontSize: "18px",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
          onClick={() => deleteTask(task.id)}
        >
          <FaTrash />
        </button>
      </div>
    </li>
  );
};

// 📋 ToDoList Component - Renders the full list of tasks
const ToDoList = ({ tasks, toggleComplete, deleteTask, editTask }) => {
  return (
    <ul
      style={{
        width: "100%",
        maxWidth: "400px",
        padding: "0",
        listStyleType: "none",
      }}
    >
      {tasks.map((task) => (
        <ToDoItem
          key={task.id}
          task={task}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </ul>
  );
};

// 🧠 App Component - Handles state, logic, and rendering
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        minHeight: "100vh",
        padding: "20px",
        background: "linear-gradient(135deg, #c2e9fb, #a1c4fd)",
      }}
    >
      <Header />

      <div
        style={{
          display: "flex",
          marginBottom: "20px",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <input
          type="text"
          style={{
            flex: "1",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px 0 0 5px",
            fontSize: "16px",
            color: "#333",
            background: "#f4f6f8",
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="✏️ Add a new task"
        />
        <button
          style={{
            background: "#5c6bc0",
            color: "white",
            padding: "10px 20px",
            borderRadius: "0 5px 5px 0",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
          onClick={addTask}
        >
          Add
        </button>
      </div>

      <ToDoList
        tasks={tasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    </div>
  );
};

export default App;
