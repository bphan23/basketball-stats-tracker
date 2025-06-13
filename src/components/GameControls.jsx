import React from "react";
import "./GameControls.css";

function GameControls({
  teams,
  selectedTeam,
  selectedPlayer,
  onTeamSelect,
  onPlayerSelect,
  onStatUpdate,
  onNextPeriod,
  onUndoPlay,
  gameType,
  playHistory,
}) {
  return (
    <div className="game-controls">
      <div className="team-selector">
        <button
          className={selectedTeam === "home" ? "selected" : ""}
          onClick={() => onTeamSelect("home")}
        >
          {teams.home.name}
        </button>
        <button
          className={selectedTeam === "away" ? "selected" : ""}
          onClick={() => onTeamSelect("away")}
        >
          {teams.away.name}
        </button>
      </div>

      <div className="players-section">
        <h3>Select Player</h3>
        <div className="players-container">
          <div className="team-players home-team">
            <h4>{teams.home.name}</h4>
            <div className="players-grid">
              {teams.home.players.map((player) => (
                <button
                  key={`home-${player.id}`}
                  className={`home-player ${
                    selectedTeam === "home" && selectedPlayer === player.id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => {
                    onTeamSelect("home");
                    onPlayerSelect(player.id);
                  }}
                >
                  {player.name}
                </button>
              ))}
            </div>
          </div>

          <div className="team-divider"></div>

          <div className="team-players away-team">
            <h4>{teams.away.name}</h4>
            <div className="players-grid">
              {teams.away.players.map((player) => (
                <button
                  key={`away-${player.id}`}
                  className={`away-player ${
                    selectedTeam === "away" && selectedPlayer === player.id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => {
                    onTeamSelect("away");
                    onPlayerSelect(player.id);
                  }}
                >
                  {player.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <h3>Record Stats</h3>
        <div className="stats-buttons">
          <div className="stats-row">
            <button
              className="made-shot"
              onClick={() =>
                selectedTeam &&
                selectedPlayer &&
                onStatUpdate(selectedTeam, selectedPlayer, "points2")
              }
              disabled={!selectedTeam || !selectedPlayer}
            >
              2pt Made
            </button>
            <button
              className="missed-shot"
              onClick={() =>
                selectedTeam &&
                selectedPlayer &&
                onStatUpdate(selectedTeam, selectedPlayer, "missed2")
              }
              disabled={!selectedTeam || !selectedPlayer}
            >
              2pt Missed
            </button>
            <button
              className="made-shot"
              onClick={() =>
                selectedTeam &&
                selectedPlayer &&
                onStatUpdate(selectedTeam, selectedPlayer, "points3")
              }
              disabled={!selectedTeam || !selectedPlayer}
            >
              3pt Made
            </button>
            <button
              className="missed-shot"
              onClick={() =>
                selectedTeam &&
                selectedPlayer &&
                onStatUpdate(selectedTeam, selectedPlayer, "missed3")
              }
              disabled={!selectedTeam || !selectedPlayer}
            >
              3pt Missed
            </button>
            <button
              className="made-shot"
              onClick={() =>
                selectedTeam &&
                selectedPlayer &&
                onStatUpdate(selectedTeam, selectedPlayer, "freeThrows")
              }
              disabled={!selectedTeam || !selectedPlayer}
            >
              FT Made
            </button>
            <button
              className="missed-shot"
              onClick={() =>
                selectedTeam &&
                selectedPlayer &&
                onStatUpdate(selectedTeam, selectedPlayer, "missedFreeThrows")
              }
              disabled={!selectedTeam || !selectedPlayer}
            >
              FT Missed
            </button>
          </div>
          <div className="stats-row">
            <button
              className="other-stat"
              onClick={() =>
                selectedTeam &&
                selectedPlayer &&
                onStatUpdate(selectedTeam, selectedPlayer, "offensiveRebounds")
              }
              disabled={!selectedTeam || !selectedPlayer}
            >
              Off Reb
            </button>
            <button
              className="other-stat"
              onClick={() =>
                selectedTeam &&
                selectedPlayer &&
                onStatUpdate(selectedTeam, selectedPlayer, "defensiveRebounds")
              }
              disabled={!selectedTeam || !selectedPlayer}
            >
              Def Reb
            </button>
            <button
              className="other-stat"
              onClick={() =>
                selectedTeam &&
                selectedPlayer &&
                onStatUpdate(selectedTeam, selectedPlayer, "blocks")
              }
              disabled={!selectedTeam || !selectedPlayer}
            >
              Block
            </button>
            <button
              className="other-stat"
              onClick={() =>
                selectedTeam &&
                selectedPlayer &&
                onStatUpdate(selectedTeam, selectedPlayer, "assists")
              }
              disabled={!selectedTeam || !selectedPlayer}
            >
              Assist
            </button>
            <button
              className="other-stat"
              onClick={() =>
                selectedTeam &&
                selectedPlayer &&
                onStatUpdate(selectedTeam, selectedPlayer, "steals")
              }
              disabled={!selectedTeam || !selectedPlayer}
            >
              Steal
            </button>
            <button
              className="other-stat"
              onClick={() =>
                selectedTeam &&
                selectedPlayer &&
                onStatUpdate(selectedTeam, selectedPlayer, "turnovers")
              }
              disabled={!selectedTeam || !selectedPlayer}
            >
              Turnover
            </button>
          </div>
          <div className="stats-row">
            <button
              className="other-stat"
              onClick={() =>
                selectedTeam &&
                selectedPlayer &&
                onStatUpdate(selectedTeam, selectedPlayer, "fouls")
              }
              disabled={!selectedTeam || !selectedPlayer}
            >
              Foul
            </button>
            <button
              className="other-stat"
              onClick={() =>
                selectedTeam &&
                selectedPlayer &&
                onStatUpdate(selectedTeam, selectedPlayer, "timeouts")
              }
              disabled={!selectedTeam || !selectedPlayer}
            >
              Timeout
            </button>
            <button className="empty"></button>
            <button className="empty"></button>
            <button className="empty"></button>
            <button className="empty"></button>
          </div>
        </div>
      </div>

      <div className="game-controls-footer">
        <button className="next-period-button" onClick={onNextPeriod}>
          Next {gameType === "quarters" ? "Quarter" : "Half"}
        </button>
        <button
          className="undo-button"
          onClick={onUndoPlay}
          disabled={playHistory.length === 0}
        >
          Undo Last Play
        </button>
      </div>
    </div>
  );
}

export default GameControls;
