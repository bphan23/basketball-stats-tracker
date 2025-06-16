import React, { useEffect, useState } from "react";
import { RiAddLine, RiSearchLine, RiCloseLine } from "react-icons/ri";
import "./Players.css";
import { getPlayers } from "../services/apiPlayers";

function Players() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [players, setPlayers] = useState([
    {
      id: 1,
      name: "John Doe",
      team: "Home Team",
      position: "Point Guard",
      height: "6'2\"",
      weight: "185",
      email: "john.doe@example.com",
      phone: "(555) 123-4567",
    },
    // Add more sample players as needed
  ]);

  useEffect(function () {
    getPlayers().then((data) => console.log(data));
  }, []);

  const [newPlayer, setNewPlayer] = useState({
    name: "",
    team: "",
    position: "",
    heightFeet: "",
    heightInches: "",
    weight: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlayer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddPlayer = (e) => {
    e.preventDefault();
    const height = `${newPlayer.heightFeet}'${newPlayer.heightInches}"`;
    const playerToAdd = {
      ...newPlayer,
      height,
      id: players.length + 1,
    };
    // Remove heightFeet and heightInches from the player object
    const { heightFeet, heightInches, ...playerData } = playerToAdd;
    setPlayers((prev) => [...prev, playerData]);
    setNewPlayer({
      name: "",
      team: "",
      position: "",
      heightFeet: "",
      heightInches: "",
      weight: "",
      email: "",
      phone: "",
    });
    setShowAddModal(false);
  };

  const filteredPlayers = players.filter((player) =>
    Object.values(player).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="players-page">
      <div className="players-header">
        <h1>Players</h1>
        <div className="players-actions">
          <div className="search-bar">
            <RiSearchLine className="search-icon" />
            <input
              type="text"
              placeholder="Search players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            className="add-player-button"
            onClick={() => setShowAddModal(true)}
          >
            <RiAddLine />
            Add New Player
          </button>
        </div>
      </div>

      <div className="players-table-container">
        <table className="players-table">
          <thead>
            <tr>
              <th>Player</th>
              <th>Height</th>
              <th>Position</th>
              <th>Weight</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.map((player) => (
              <tr key={player.id}>
                <td>{player.name}</td>
                <td>{player.team}</td>
                <td>{player.position}</td>
                <td>{player.height}</td>
                <td>{player.weight}</td>
                <td>{player.email}</td>
                <td>{player.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Player</h2>
              <button
                className="close-button"
                onClick={() => setShowAddModal(false)}
              >
                <RiCloseLine />
              </button>
            </div>
            <form onSubmit={handleAddPlayer}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newPlayer.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="team">Team</label>
                  <input
                    type="text"
                    id="team"
                    name="team"
                    value={newPlayer.team}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="position">Position</label>
                  <select
                    id="position"
                    name="position"
                    value={newPlayer.position}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Position</option>
                    <option value="Point Guard">Point Guard</option>
                    <option value="Shooting Guard">Shooting Guard</option>
                    <option value="Small Forward">Small Forward</option>
                    <option value="Power Forward">Power Forward</option>
                    <option value="Center">Center</option>
                  </select>
                </div>
                <div className="form-group height-group">
                  <label>Height</label>
                  <div className="height-inputs">
                    <div className="height-input">
                      <input
                        type="number"
                        name="heightFeet"
                        value={newPlayer.heightFeet}
                        onChange={handleInputChange}
                        min="4"
                        max="8"
                        placeholder="Feet"
                        required
                      />
                      <span className="height-label">ft</span>
                    </div>
                    <div className="height-input">
                      <input
                        type="number"
                        name="heightInches"
                        value={newPlayer.heightInches}
                        onChange={handleInputChange}
                        min="0"
                        max="11"
                        placeholder="Inches"
                        required
                      />
                      <span className="height-label">in</span>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="weight">Weight (lbs)</label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={newPlayer.weight}
                    onChange={handleInputChange}
                    min="100"
                    max="400"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={newPlayer.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="(555) 123-4567"
                    value={newPlayer.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Add Player
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Players;
