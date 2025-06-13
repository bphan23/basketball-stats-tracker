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
      acc.points +=
        player.stats.points2 * 2 +
        player.stats.points3 * 3 +
        player.stats.freeThrows;
      acc.fgMade += player.stats.points2 + player.stats.points3;
      acc.fgAttempted +=
        player.stats.points2 +
        player.stats.points3 +
        player.stats.missed2 +
        player.stats.missed3;
      acc.threeMade += player.stats.points3;
      acc.threeAttempted += player.stats.points3 + player.stats.missed3;
      acc.ftMade += player.stats.freeThrows;
      acc.ftAttempted +=
        player.stats.freeThrows + player.stats.missedFreeThrows;
      acc.rebounds +=
        player.stats.offensiveRebounds + player.stats.defensiveRebounds;
      acc.assists += player.stats.assists;
      acc.steals += player.stats.steals;
      acc.blocks += player.stats.blocks;
      acc.turnovers += player.stats.turnovers;
      acc.fouls += player.stats.fouls;
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
      points: 0,
      fgMade: 0,
      fgAttempted: 0,
      threeMade: 0,
      threeAttempted: 0,
      ftMade: 0,
      ftAttempted: 0,
      rebounds: 0,
      assists: 0,
      steals: 0,
      blocks: 0,
      turnovers: 0,
      fouls: 0,
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
            <th>PTS</th>
            <th>FG</th>
            <th>3PT</th>
            <th>FT</th>
            <th>REB</th>
            <th>AST</th>
            <th>STL</th>
            <th>BLK</th>
            <th>TO</th>
            <th>PF</th>
            <th>EFF</th>
            <th>PTS</th>
          </tr>
        </thead>
        <tbody>
          {team.players.map((player) => {
            const points =
              player.stats.points2 * 2 +
              player.stats.points3 * 3 +
              player.stats.freeThrows;
            const fgMade = player.stats.points2 + player.stats.points3;
            const fgAttempted =
              fgMade + player.stats.missed2 + player.stats.missed3;
            const threeMade = player.stats.points3;
            const threeAttempted = threeMade + player.stats.missed3;
            const ftMade = player.stats.freeThrows;
            const ftAttempted = ftMade + player.stats.missedFreeThrows;
            const rebounds =
              player.stats.offensiveRebounds + player.stats.defensiveRebounds;
            const efficiency =
              points +
              rebounds +
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
                <td>{points}</td>
                <td>{`${fgMade}/${fgAttempted}`}</td>
                <td>{`${threeMade}/${threeAttempted}`}</td>
                <td>{`${ftMade}/${ftAttempted}`}</td>
                <td>{rebounds}</td>
                <td>{player.stats.assists}</td>
                <td>{player.stats.steals}</td>
                <td>{player.stats.blocks}</td>
                <td>{player.stats.turnovers}</td>
                <td>{player.stats.fouls}</td>
                <td>{efficiency}</td>
                <td>{points}</td>
              </tr>
            );
          })}
          <tr className="totals">
            <td>TOTAL</td>
            <td>{totals.points}</td>
            <td>{`${totals.fgMade}/${totals.fgAttempted}`}</td>
            <td>{`${totals.threeMade}/${totals.threeAttempted}`}</td>
            <td>{`${totals.ftMade}/${totals.ftAttempted}`}</td>
            <td>{totals.rebounds}</td>
            <td>{totals.assists}</td>
            <td>{totals.steals}</td>
            <td>{totals.blocks}</td>
            <td>{totals.turnovers}</td>
            <td>{totals.fouls}</td>
            <td>{totals.efficiency}</td>
            <td>{totals.points}</td>
          </tr>
          <tr className="percentages">
            <td></td>
            <td></td>
            <td>{calculatePercentage(totals.fgMade, totals.fgAttempted)}</td>
            <td>
              {calculatePercentage(totals.threeMade, totals.threeAttempted)}
            </td>
            <td>{calculatePercentage(totals.ftMade, totals.ftAttempted)}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BoxScore;
