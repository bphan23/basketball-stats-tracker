import React from "react";
import "./Scoreboard.css";

function Scoreboard({ teams, gameType, currentPeriod }) {
  return (
    <div className="scoreboard">
      <div className="team">
        <div className="team-name">{teams.home.name}</div>

        <div className="score-box">
          <div className="score">{teams.home.score}</div>
        </div>
        <div className="stats-boxes">
          <div className="stat-box">
            <div className="stat-label">TIMEOUTS</div>
            <div className="stat-value">{teams.home.timeouts}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">FOULS</div>
            <div className="stat-value">{teams.home.fouls || 0}</div>
          </div>
        </div>
      </div>

      <div className="center-info">
        <div className="score-separator">:</div>
        <div className="period-display">
          {gameType === "quarters" ? `Q${currentPeriod}` : `H${currentPeriod}`}
        </div>
      </div>

      <div className="team">
        <div className="team-name">{teams.away.name}</div>

        <div className="score-box">
          <div className="score">{teams.away.score}</div>
        </div>
        <div className="stats-boxes">
          <div className="stat-box">
            <div className="stat-label">TIMEOUTS</div>
            <div className="stat-value">{teams.away.timeouts}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">FOULS</div>
            <div className="stat-value">{teams.away.fouls || 0}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Scoreboard;
