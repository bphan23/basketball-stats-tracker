import React from "react";
import "./ResponsiveWarning.css";

function ResponsiveWarning() {
  return (
    <div className="responsive-warning">
      <div className="warning-content">
        <h2>Screen Size Warning</h2>
        <p>
          For the best experience, please use a screen width of at least 1024px.
          The basketball stats tracker is designed for larger screens to provide
          the most comprehensive view of game data.
        </p>
        <p>
          We're working on making it more responsive for smaller screens. Stay
          tuned!
        </p>
      </div>
    </div>
  );
}

export default ResponsiveWarning;
