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
  onAddPlay,
  currentPeriod,
}) {
  const handleStatUpdate = (team, playerId, statType) => {
    const player = teams[team].players.find((p) => p.id === playerId);
    if (!player) return;

    const newPlay = {
      id: Date.now(),
      team,
      player: player.name,
      statType,
      period: currentPeriod,
      description: `${player.name} - ${getStatDescription(statType)}`,
    };

    onStatUpdate(team, playerId, statType);
    onAddPlay(newPlay);
  };

  const handleUndoPlay = () => {
    if (playHistory.length > 0) {
      const lastPlay = playHistory[0];
      onUndoPlay(lastPlay);
    }
  };

  const getStatDescription = (statType) => {
    const descriptions = {
      points2: "2pt Made",
      missed2: "2pt Missed",
      points3: "3pt Made",
      missed3: "3pt Missed",
      freeThrows: "FT Made",
      missedFreeThrows: "FT Missed",
      offensiveRebounds: "Offensive Rebound",
      defensiveRebounds: "Defensive Rebound",
      blocks: "Block",
      assists: "Assist",
      steals: "Steal",
      turnovers: "Turnover",
      fouls: "Foul",
      timeouts: "Timeout",
    };
    return descriptions[statType] || statType;
  };

  return (
    <div className="game-controls">
      <div className="players-stats-section">
        <div className="players-container">
          <div className="team-players home-team">
            <h4>{teams.home.name}</h4>
            <div className="players-grid square-grid">
              {teams.home.players.map((player) => (
                <button
                  key={`home-${player.id}`}
                  className={`home-player square-player-btn ${
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

          <div className="team-players away-team">
            <h4>{teams.away.name}</h4>
            <div className="players-grid square-grid">
              {teams.away.players.map((player) => (
                <button
                  key={`away-${player.id}`}
                  className={`away-player square-player-btn ${
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

        <div className="stats-buttons">
          <div className="stats-row">
            <button
              className="made-shot"
              onClick={() =>
                selectedTeam &&
                selectedPlayer &&
                handleStatUpdate(selectedTeam, selectedPlayer, "points2")
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
                handleStatUpdate(selectedTeam, selectedPlayer, "missed2")
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
                handleStatUpdate(selectedTeam, selectedPlayer, "points3")
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
                handleStatUpdate(selectedTeam, selectedPlayer, "missed3")
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
                handleStatUpdate(selectedTeam, selectedPlayer, "freeThrows")
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
                handleStatUpdate(
                  selectedTeam,
                  selectedPlayer,
                  "missedFreeThrows"
                )
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
                handleStatUpdate(
                  selectedTeam,
                  selectedPlayer,
                  "offensiveRebounds"
                )
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
                handleStatUpdate(
                  selectedTeam,
                  selectedPlayer,
                  "defensiveRebounds"
                )
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
                handleStatUpdate(selectedTeam, selectedPlayer, "blocks")
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
                handleStatUpdate(selectedTeam, selectedPlayer, "assists")
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
                handleStatUpdate(selectedTeam, selectedPlayer, "steals")
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
                handleStatUpdate(selectedTeam, selectedPlayer, "turnovers")
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
                handleStatUpdate(selectedTeam, selectedPlayer, "fouls")
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
                handleStatUpdate(selectedTeam, selectedPlayer, "timeouts")
              }
              disabled={!selectedTeam || !selectedPlayer}
            >
              Timeout
            </button>
            <button className="empty"></button>
            <button className="empty"></button>
            <button className="next-period-button" onClick={onNextPeriod}>
              Next {gameType === "quarters" ? "Quarter" : "Half"}
            </button>
            <button
              className="undo-button"
              onClick={handleUndoPlay}
              disabled={playHistory.length === 0}
            >
              Undo Last Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameControls;
