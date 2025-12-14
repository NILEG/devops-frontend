import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://66.135.1.147:5000";

function TodoList({ setAuth }) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchTodos();
  }, []);

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/todos`,
        getAuthHeaders()
      );
      setTodos(response.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      await axios.post(
        `${API_URL}/api/todos`,
        { title: newTodo },
        getAuthHeaders()
      );
      setNewTodo("");
      fetchTodos();
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      await axios.patch(
        `${API_URL}/api/todos/${id}`,
        { completed: !completed },
        getAuthHeaders()
      );
      fetchTodos();
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/todos/${id}`, getAuthHeaders());
      fetchTodos();
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth(false);
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Todo List</h2>
          <div>
            <span style={styles.username}>
              Welcome, {user?.name || "User"}!
            </span>
            <button onClick={handleLogout} style={styles.logoutButton}>
              Logout
            </button>
          </div>
        </div>

        <form onSubmit={addTodo} style={styles.form}>
          <input
            type="text"
            placeholder="Add a new todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.addButton}>
            Add
          </button>
        </form>

        <div style={styles.todoList}>
          {todos.length === 0 ? (
            <p style={styles.emptyMessage}>No todos yet. Add one above!</p>
          ) : (
            todos.map((todo) => (
              <div key={todo.id} style={styles.todoItem}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id, todo.completed)}
                  style={styles.checkbox}
                />
                <span
                  style={{
                    ...styles.todoText,
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "#999" : "#333",
                  }}
                >
                  {todo.title}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "1rem",
  },
  card: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "600px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  title: {
    margin: 0,
    color: "#333",
  },
  username: {
    marginRight: "1rem",
    color: "#666",
  },
  logoutButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  form: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "1.5rem",
  },
  input: {
    flex: 1,
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  addButton: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  todoList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  todoItem: {
    display: "flex",
    alignItems: "center",
    padding: "0.75rem",
    backgroundColor: "#f8f9fa",
    borderRadius: "4px",
    gap: "0.5rem",
  },
  checkbox: {
    width: "20px",
    height: "20px",
    cursor: "pointer",
  },
  todoText: {
    flex: 1,
    fontSize: "1rem",
  },
  deleteButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.875rem",
  },
  emptyMessage: {
    textAlign: "center",
    color: "#999",
    padding: "2rem",
  },
};

export default TodoList;
