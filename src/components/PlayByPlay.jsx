import React from "react";
import "./PlayByPlay.css";

const PlayByPlay = ({ playHistory }) => {
  return (
    <div className="play-history">
      <h3>Play by Play</h3>
      <div className="play-list">
        {playHistory.map((play, index) => (
          <div
            key={index}
            className={`play-item ${
              play.team === "home" ? "home-team-play" : "away-team-play"
            }`}
          >
            <span className="play-period">{play.period}</span>
            <span className="team-indicator">
              {play.team === "home" ? "Home" : "Away"}
            </span>
            <span className="play-description">{play.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayByPlay;
