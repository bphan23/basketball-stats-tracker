import React, { useReducer, useState } from "react";
import "./Games.css";
import Scoreboard from "../components/Scoreboard";
import PlayByPlay from "../components/PlayByPlay";
import GameControls from "../components/GameControls";
import BoxScore from "../components/BoxScore";
import TechnicalFoulModal from "../components/TechnicalFoulModal";
import { gameReducer, initialState } from "../reducers/gameReducer";

function Games() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [technicalFoul, setTechnicalFoul] = useState({
    show: false,
    message: "",
  });

  const handleStatUpdate = (team, playerId, statType) => {
    if (statType === "timeouts" && state.teams[team].timeouts === 0) {
      setTechnicalFoul({
        show: true,
        message: `${state.teams[team].name} attempted to call a timeout with none remaining - Technical Foul!`,
      });
      return;
    }

    dispatch({
      type: "UPDATE_PLAYER_STAT",
      team,
      playerId,
      statType,
    });
  };

  const handleNextPeriod = () => {
    dispatch({ type: "NEXT_PERIOD" });
  };

  const handleUndoPlay = () => {
    dispatch({ type: "UNDO_LAST_PLAY" });
  };

  const handleTeamSelect = (team) => {
    dispatch({ type: "SELECT_TEAM", payload: team });
  };

  const handlePlayerSelect = (playerId) => {
    dispatch({ type: "SELECT_PLAYER", payload: playerId });
  };

  return (
    <main className="games-page">
      {technicalFoul.show && (
        <TechnicalFoulModal
          message={technicalFoul.message}
          onClose={() => setTechnicalFoul({ show: false, message: "" })}
        />
      )}
      <Scoreboard
        teams={{
          home: {
            name: state.teams.home.name,
            score: state.teams.home.score,
            timeouts: state.teams.home.timeouts,
            fouls: state.teams.home.fouls,
          },
          away: {
            name: state.teams.away.name,
            score: state.teams.away.score,
            timeouts: state.teams.away.timeouts,
            fouls: state.teams.away.fouls,
          },
        }}
        gameType={state.gameSetup.gameType}
        currentPeriod={state.currentPeriod}
      />

      <section className="game-content">
        <GameControls
          teams={{
            home: {
              name: state.teams.home.name,
              players: state.teams.home.players,
            },
            away: {
              name: state.teams.away.name,
              players: state.teams.away.players,
            },
          }}
          selectedTeam={state.selectedTeam}
          selectedPlayer={state.selectedPlayer}
          onTeamSelect={handleTeamSelect}
          onPlayerSelect={handlePlayerSelect}
          onStatUpdate={handleStatUpdate}
          onNextPeriod={handleNextPeriod}
          onUndoPlay={handleUndoPlay}
          gameType={state.gameSetup.gameType}
          playHistory={state.playHistory}
        />
        <PlayByPlay playHistory={state.playHistory} />
      </section>

      <section className="boxscore-section">
        <BoxScore
          team={state.teams.home}
          onPlayerSelect={handlePlayerSelect}
          selectedPlayerId={state.selectedPlayer}
        />
        <BoxScore
          team={state.teams.away}
          onPlayerSelect={handlePlayerSelect}
          selectedPlayerId={state.selectedPlayer}
        />
      </section>
    </main>
  );
}

export default Games;
