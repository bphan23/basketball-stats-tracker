import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import "./Settings.css";

function Settings({ isOpen, onClose }) {
  const [gameSettings, setGameSettings] = useState({
    periodType: "quarters", // 'quarters' or 'halves'
    periodLength: 10, // minutes
    timeoutsPerTeam: 4,
    foulsPerPlayer: 5,
    bonusFouls: 5,
    doubleBonusFouls: 7,
    shotClock: 24,
    overtimeLength: 5, // minutes
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setGameSettings((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="settings-modal-overlay">
      <div className="settings-modal">
        <div className="settings-modal-header">
          <h1>Game Settings</h1>
          <button className="close-button" onClick={onClose}>
            <RiCloseLine />
          </button>
        </div>

        <div className="settings-modal-content">
          <div className="settings-grid">
            <div className="settings-section">
              <h2>Game Structure</h2>

              <div className="setting-item">
                <label>Period Type</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="periodType"
                      value="quarters"
                      checked={gameSettings.periodType === "quarters"}
                      onChange={handleChange}
                    />
                    Quarters
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="periodType"
                      value="halves"
                      checked={gameSettings.periodType === "halves"}
                      onChange={handleChange}
                    />
                    Halves
                  </label>
                </div>
              </div>

              <div className="setting-item">
                <label>Period Length (minutes)</label>
                <input
                  type="number"
                  name="periodLength"
                  value={gameSettings.periodLength}
                  onChange={handleChange}
                  min="1"
                  max="20"
                />
              </div>

              <div className="setting-item">
                <label>Overtime Length (minutes)</label>
                <input
                  type="number"
                  name="overtimeLength"
                  value={gameSettings.overtimeLength}
                  onChange={handleChange}
                  min="1"
                  max="10"
                />
              </div>
            </div>

            <div className="settings-section">
              <h2>Timeouts & Fouls</h2>

              <div className="setting-item">
                <label>Timeouts per Team</label>
                <input
                  type="number"
                  name="timeoutsPerTeam"
                  value={gameSettings.timeoutsPerTeam}
                  onChange={handleChange}
                  min="0"
                  max="10"
                />
              </div>

              <div className="setting-item">
                <label>Fouls per Player</label>
                <input
                  type="number"
                  name="foulsPerPlayer"
                  value={gameSettings.foulsPerPlayer}
                  onChange={handleChange}
                  min="1"
                  max="10"
                />
              </div>

              <div className="setting-item">
                <label>Bonus Fouls</label>
                <input
                  type="number"
                  name="bonusFouls"
                  value={gameSettings.bonusFouls}
                  onChange={handleChange}
                  min="0"
                  max="10"
                />
              </div>

              <div className="setting-item">
                <label>Double Bonus Fouls</label>
                <input
                  type="number"
                  name="doubleBonusFouls"
                  value={gameSettings.doubleBonusFouls}
                  onChange={handleChange}
                  min="0"
                  max="10"
                />
              </div>
            </div>

            <div className="settings-section">
              <h2>Game Clock</h2>

              <div className="setting-item">
                <label>Shot Clock (seconds)</label>
                <input
                  type="number"
                  name="shotClock"
                  value={gameSettings.shotClock}
                  onChange={handleChange}
                  min="14"
                  max="35"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="settings-modal-footer">
          <button className="save-button">Save Settings</button>
          <button className="reset-button">Reset to Default</button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
