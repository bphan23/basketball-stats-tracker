export const initialState = {
  gameStarted: false,
  gameSetup: {
    gameType: "quarters",
    timeoutsPerTeam: 4,
  },
  currentPeriod: 1,
  selectedTeam: null,
  selectedPlayer: null,
  playHistory: [],
  teams: {
    home: {
      name: "Home Team",
      score: 0,
      timeouts: 4,
      fouls: 0,
      players: Array(10)
        .fill()
        .map((_, i) => ({
          id: i + 1,
          name: `Player ${i + 1}`,
          stats: {
            points2: 0,
            points3: 0,
            freeThrows: 0,
            missed2: 0,
            missed3: 0,
            missedFreeThrows: 0,
            offensiveRebounds: 0,
            defensiveRebounds: 0,
            blocks: 0,
            assists: 0,
            steals: 0,
            turnovers: 0,
            fouls: 0,
            timeouts: 0,
          },
        })),
    },
    away: {
      name: "Away Team",
      score: 0,
      timeouts: 4,
      fouls: 0,
      players: Array(10)
        .fill()
        .map((_, i) => ({
          id: i + 1,
          name: `Player ${i + 1}`,
          stats: {
            points2: 0,
            points3: 0,
            freeThrows: 0,
            missed2: 0,
            missed3: 0,
            missedFreeThrows: 0,
            offensiveRebounds: 0,
            defensiveRebounds: 0,
            blocks: 0,
            assists: 0,
            steals: 0,
            turnovers: 0,
            fouls: 0,
            timeouts: 0,
          },
        })),
    },
  },
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case "START_GAME":
      return {
        ...state,
        gameStarted: true,
        teams: {
          home: {
            ...state.teams.home,
            timeouts: state.gameSetup.timeoutsPerTeam,
            fouls: 0,
          },
          away: {
            ...state.teams.away,
            timeouts: state.gameSetup.timeoutsPerTeam,
            fouls: 0,
          },
        },
      };

    case "UPDATE_GAME_SETUP":
      return {
        ...state,
        gameSetup: {
          ...state.gameSetup,
          [action.field]: action.value,
        },
      };

    case "NEXT_PERIOD":
      const maxPeriods = state.gameSetup.gameType === "quarters" ? 4 : 2;
      if (state.currentPeriod < maxPeriods) {
        return {
          ...state,
          currentPeriod: state.currentPeriod + 1,
          teams: {
            ...state.teams,
            home: {
              ...state.teams.home,
              fouls: 0, // Reset fouls each period
            },
            away: {
              ...state.teams.away,
              fouls: 0, // Reset fouls each period
            },
          },
        };
      }
      return state;

    case "SELECT_TEAM":
      return {
        ...state,
        selectedTeam: action.payload,
        selectedPlayer: null,
      };

    case "SELECT_PLAYER":
      return {
        ...state,
        selectedPlayer: action.payload,
      };

    case "UPDATE_PLAYER_STAT": {
      const { team, playerId, statType } = action;
      const newTeams = JSON.parse(JSON.stringify(state.teams));
      const player = newTeams[team].players.find((p) => p.id === playerId);

      if (player) {
        player.stats[statType]++;

        if (statType === "points2") {
          newTeams[team].score += 2;
        } else if (statType === "points3") {
          newTeams[team].score += 3;
        } else if (statType === "freeThrows") {
          newTeams[team].score += 1;
        } else if (statType === "timeouts") {
          if (newTeams[team].timeouts > 0) {
            newTeams[team].timeouts--;
          }
        } else if (statType === "fouls") {
          newTeams[team].fouls++;
        }

        // Create descriptive play text
        let playDescription = "";
        switch (statType) {
          case "points2":
            playDescription = `${player.name} made a 2-point shot`;
            break;
          case "points3":
            playDescription = `${player.name} made a 3-point shot`;
            break;
          case "freeThrows":
            playDescription = `${player.name} made a free throw`;
            break;
          case "missed2":
            playDescription = `${player.name} missed a 2-point shot`;
            break;
          case "missed3":
            playDescription = `${player.name} missed a 3-point shot`;
            break;
          case "missedFreeThrows":
            playDescription = `${player.name} missed a free throw`;
            break;
          case "offensiveRebounds":
            playDescription = `${player.name} grabbed an offensive rebound`;
            break;
          case "defensiveRebounds":
            playDescription = `${player.name} grabbed a defensive rebound`;
            break;
          case "blocks":
            playDescription = `${player.name} blocked a shot`;
            break;
          case "assists":
            playDescription = `${player.name} recorded an assist`;
            break;
          case "steals":
            playDescription = `${player.name} stole the ball`;
            break;
          case "turnovers":
            playDescription = `${player.name} committed a turnover`;
            break;
          case "fouls":
            playDescription = `${player.name} committed a foul`;
            break;
          case "timeouts":
            playDescription = `${newTeams[team].name} called a timeout`;
            break;
          default:
            playDescription = `${player.name} recorded a ${statType}`;
        }

        const play = {
          id: Date.now(),
          period: state.currentPeriod,
          team,
          player: player.name,
          statType,
          timestamp: new Date().toLocaleTimeString(),
          teamsState: JSON.parse(JSON.stringify(newTeams)),
          pointsAdded:
            statType === "points2"
              ? 2
              : statType === "points3"
              ? 3
              : statType === "freeThrows"
              ? 1
              : 0,
          description: playDescription,
        };

        return {
          ...state,
          teams: newTeams,
          playHistory: [play, ...state.playHistory],
        };
      }
      return state;
    }

    case "UNDO_LAST_PLAY":
      if (state.playHistory.length === 0) return state;
      const lastPlay = state.playHistory[0];
      return {
        ...state,
        teams: lastPlay.teamsState,
        playHistory: state.playHistory.slice(1),
      };

    default:
      return state;
  }
};
