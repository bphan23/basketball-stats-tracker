import React from "react";
import "./PlayByPlay.css";

function PlayByPlay({ playHistory }) {
  return (
    <div className="play-history">
      <h3>Play by Play</h3>
      <div className="play-list">
        {playHistory.map((play) => (
          <div key={play.id} className={`play-item ${play.team}-team-play`}>
            <span className="play-period">Q{play.period}</span>
            <span className="team-indicator">
              {play.team === "home" ? "HOME" : "AWAY"}
            </span>
            <span className="play-description">{play.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlayByPlay;
