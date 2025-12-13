import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import TodoList from "./components/TodoList";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/todos" />
            ) : (
              <Login setAuth={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/todos" /> : <Register />}
        />
        <Route
          path="/todos"
          element={
            isAuthenticated ? (
              <TodoList setAuth={setIsAuthenticated} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/" element={<Navigate to="/todos" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
