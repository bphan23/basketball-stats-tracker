import React, { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  RiDashboardLine,
  RiBasketballLine,
  RiUserLine,
  RiBarChartLine,
  RiLogoutBoxLine,
  RiSunLine,
  RiMoonLine,
  RiSettings4Line,
  RiTeamLine,
} from "react-icons/ri";
import { useTheme } from "../context/ThemeContext";
import ResponsiveWarning from "./ResponsiveWarning";
import Settings from "../pages/Settings";
import "./Layout.css";

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const navItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: RiDashboardLine,
      active: true,
    },
    { path: "/games", label: "Games", icon: RiBasketballLine, active: true },
    { path: "#", label: "Teams", icon: RiTeamLine, disabled: true },
    { path: "#", label: "Players", icon: RiUserLine, disabled: true },
    { path: "#", label: "Stats", icon: RiBarChartLine, disabled: true },
  ];

  const handleLogout = () => {
    // Add logout logic here
    navigate("/login");
  };

  return (
    <div className={`layout ${isDarkMode ? "dark-mode" : ""}`}>
      <ResponsiveWarning />
      <Settings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Side Navigation */}
      <aside className="side-nav">
        <div className="nav-brand">
          <h1>EzStats</h1>
        </div>
        <div className="nav-section">
          <h3 className="nav-section-title">Main</h3>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${item.disabled ? "disabled" : ""} ${
                location.pathname === item.path ? "active" : ""
              }`}
              onClick={(e) => item.disabled && e.preventDefault()}
            >
              <div className="nav-item-content">
                <item.icon className="nav-icon" />
                <span className="nav-label">{item.label}</span>
              </div>
              {item.disabled && (
                <span className="coming-soon">Coming Soon</span>
              )}
            </Link>
          ))}
        </div>
        <div className="nav-footer">
          <button className="logout-button" onClick={handleLogout}>
            <div className="nav-item-content">
              <RiLogoutBoxLine className="nav-icon" />
              <span className="nav-label">Logout</span>
            </div>
          </button>
        </div>
      </aside>

      <div className="main-wrapper">
        {/* Top Navbar */}
        <nav className="top-nav">
          <div className="nav-left">
            <div className="theme-toggle-container">
              <RiSunLine className="theme-icon sun" />
              <label className="theme-switch">
                <input
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={toggleTheme}
                />
                <span className="slider"></span>
              </label>
              <RiMoonLine className="theme-icon moon" />
            </div>
          </div>
          <div className="nav-right">
            <button
              className="nav-button"
              onClick={() => setIsSettingsOpen(true)}
            >
              <RiSettings4Line className="nav-icon" />
              Settings
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
