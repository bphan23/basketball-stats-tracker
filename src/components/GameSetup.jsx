import React, { useState } from "react";

function GameSetup({ onGameSetup }) {
  const [gameSetup, setGameSetup] = useState({
    gameType: "quarters",
    timeoutsPerTeam: 3,
  });

  const handleSetupChange = (field, value) => {
    setGameSetup((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleStartGame = () => {
    onGameSetup(gameSetup);
  };

  return (
    <div className="game-setup">
      <h2>Game Setup</h2>
      <div className="setup-options">
        <div className="setup-group">
          <label>Game Type:</label>
          <select
            value={gameSetup.gameType}
            onChange={(e) => handleSetupChange("gameType", e.target.value)}
          >
            <option value="quarters">4 Quarters</option>
            <option value="halves">2 Halves</option>
          </select>
        </div>
        <div className="setup-group">
          <label>Timeouts per Team:</label>
          <select
            value={gameSetup.timeoutsPerTeam}
            onChange={(e) =>
              handleSetupChange("timeoutsPerTeam", parseInt(e.target.value))
            }
          >
            <option value="3">3 Timeouts</option>
            <option value="4">4 Timeouts</option>
            <option value="5">5 Timeouts</option>
          </select>
        </div>
        <button className="start-game-button" onClick={handleStartGame}>
          Start Game
        </button>
      </div>
    </div>
  );
}

export default GameSetup;
