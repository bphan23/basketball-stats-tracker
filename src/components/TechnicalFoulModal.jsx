import React from "react";
import "./TechnicalFoulModal.css";

function TechnicalFoulModal({ message, onClose }) {
  return (
    <div className="technical-foul-overlay">
      <div className="technical-foul-modal">
        <div className="technical-foul-content">
          <h2>TECHNICAL FOUL</h2>
          <p>{message}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default TechnicalFoulModal;
