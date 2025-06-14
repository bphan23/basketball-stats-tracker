import React from "react";
import "./BoxScore.css";

const calculatePercentage = (made, attempted) => {
  if (attempted === 0) return "0.0%";
  return `${((made / attempted) * 100).toFixed(1)}%`;
};

function BoxScore({ team, onPlayerSelect, selectedPlayerId }) {
  // Calculate team totals
  const totals = team.players.reduce(
    (acc, player) => {
      // Field Goals
      acc.fgMade += player.stats.points2 + player.stats.points3;
      acc.fgAttempted +=
        player.stats.points2 +
        player.stats.points3 +
        player.stats.missed2 +
        player.stats.missed3;

      // 2-pointers
      acc.twoPtMade += player.stats.points2;
      acc.twoPtAttempted += player.stats.points2 + player.stats.missed2;

      // 3-pointers
      acc.threePtMade += player.stats.points3;
      acc.threePtAttempted += player.stats.points3 + player.stats.missed3;

      // Free Throws
      acc.ftMade += player.stats.freeThrows;
      acc.ftAttempted +=
        player.stats.freeThrows + player.stats.missedFreeThrows;

      // Rebounds
      acc.offRebounds += player.stats.offensiveRebounds;
      acc.defRebounds += player.stats.defensiveRebounds;
      acc.totalRebounds +=
        player.stats.offensiveRebounds + player.stats.defensiveRebounds;

      // Other Stats
      acc.assists += player.stats.assists;
      acc.steals += player.stats.steals;
      acc.turnovers += player.stats.turnovers;
      acc.blocks += player.stats.blocks;
      acc.fouls += player.stats.fouls;

      // Points
      acc.points +=
        player.stats.points2 * 2 +
        player.stats.points3 * 3 +
        player.stats.freeThrows;

      // Efficiency
      acc.efficiency +=
        player.stats.points2 * 2 +
        player.stats.points3 * 3 +
        player.stats.freeThrows +
        (player.stats.offensiveRebounds + player.stats.defensiveRebounds) +
        player.stats.assists +
        player.stats.steals +
        player.stats.blocks -
        (player.stats.missed2 +
          player.stats.missed3 +
          player.stats.missedFreeThrows +
          player.stats.turnovers);

      return acc;
    },
    {
      fgMade: 0,
      fgAttempted: 0,
      twoPtMade: 0,
      twoPtAttempted: 0,
      threePtMade: 0,
      threePtAttempted: 0,
      ftMade: 0,
      ftAttempted: 0,
      offRebounds: 0,
      defRebounds: 0,
      totalRebounds: 0,
      assists: 0,
      steals: 0,
      turnovers: 0,
      blocks: 0,
      fouls: 0,
      points: 0,
      efficiency: 0,
    }
  );

  return (
    <div className="box-score">
      <h3>{team.name}</h3>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>FGM-A</th>
            <th>2PM-A</th>
            <th>3PM-A</th>
            <th>FTM-A</th>
            <th>OREB</th>
            <th>DREB</th>
            <th>REB</th>
            <th>AST</th>
            <th>STL</th>
            <th>TO</th>
            <th>BLK</th>
            <th>PF</th>
            <th>EFF</th>
            <th>PTS</th>
          </tr>
        </thead>
        <tbody>
          {team.players.map((player) => {
            const fgMade = player.stats.points2 + player.stats.points3;
            const fgAttempted =
              fgMade + player.stats.missed2 + player.stats.missed3;
            const twoPtMade = player.stats.points2;
            const twoPtAttempted = twoPtMade + player.stats.missed2;
            const threePtMade = player.stats.points3;
            const threePtAttempted = threePtMade + player.stats.missed3;
            const ftMade = player.stats.freeThrows;
            const ftAttempted = ftMade + player.stats.missedFreeThrows;
            const totalRebounds =
              player.stats.offensiveRebounds + player.stats.defensiveRebounds;
            const points =
              player.stats.points2 * 2 +
              player.stats.points3 * 3 +
              player.stats.freeThrows;
            const efficiency =
              points +
              totalRebounds +
              player.stats.assists +
              player.stats.steals +
              player.stats.blocks -
              (player.stats.missed2 +
                player.stats.missed3 +
                player.stats.missedFreeThrows +
                player.stats.turnovers);

            return (
              <tr
                key={player.id}
                onClick={() => onPlayerSelect(player.id)}
                className={selectedPlayerId === player.id ? "selected" : ""}
              >
                <td>{player.name}</td>
                <td>{`${fgMade}-${fgAttempted}`}</td>
                <td>{`${twoPtMade}-${twoPtAttempted}`}</td>
                <td>{`${threePtMade}-${threePtAttempted}`}</td>
                <td>{`${ftMade}-${ftAttempted}`}</td>
                <td>{player.stats.offensiveRebounds}</td>
                <td>{player.stats.defensiveRebounds}</td>
                <td>{totalRebounds}</td>
                <td>{player.stats.assists}</td>
                <td>{player.stats.steals}</td>
                <td>{player.stats.turnovers}</td>
                <td>{player.stats.blocks}</td>
                <td>{player.stats.fouls}</td>
                <td>{efficiency}</td>
                <td>{points}</td>
              </tr>
            );
          })}
          <tr className="totals">
            <td>TOTAL</td>
            <td>{`${totals.fgMade}-${totals.fgAttempted}`}</td>
            <td>{`${totals.twoPtMade}-${totals.twoPtAttempted}`}</td>
            <td>{`${totals.threePtMade}-${totals.threePtAttempted}`}</td>
            <td>{`${totals.ftMade}-${totals.ftAttempted}`}</td>
            <td>{totals.offRebounds}</td>
            <td>{totals.defRebounds}</td>
            <td>{totals.totalRebounds}</td>
            <td>{totals.assists}</td>
            <td>{totals.steals}</td>
            <td>{totals.turnovers}</td>
            <td>{totals.blocks}</td>
            <td>{totals.fouls}</td>
            <td>{totals.efficiency}</td>
            <td>{totals.points}</td>
          </tr>
          <tr className="percentages">
            <td></td>
            <td>{calculatePercentage(totals.fgMade, totals.fgAttempted)}</td>
            <td>
              {calculatePercentage(totals.twoPtMade, totals.twoPtAttempted)}
            </td>
            <td>
              {calculatePercentage(totals.threePtMade, totals.threePtAttempted)}
            </td>
            <td>{calculatePercentage(totals.ftMade, totals.ftAttempted)}</td>
            <td colSpan="10"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BoxScore;
