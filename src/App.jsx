import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Games from "./pages/Games";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";
import Players from "./pages/Players";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="games" element={<Games />} />
            <Route path="teams" />
            <Route path="players" element={<Players />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
