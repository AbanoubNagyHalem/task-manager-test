import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskManagerView from "./Pages/TaskManagerView";
import TaskDetailsView from "./components/TaskDetailsView";
import Login from "./components/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {isLoggedIn ? (
        <Routes>
          <Route
            path="/"
            element={<TaskManagerView onLogout={handleLogout} />}
          />
          <Route path="/task/:taskId" element={<TaskDetailsView />} />
        </Routes>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </Router>
  );
}

export default App;
