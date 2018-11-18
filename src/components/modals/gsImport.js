import React from "react";
import icons from "./../../assets/icons/index";


export default () => (
  <div className="board shadowize gs-modal">
    <img src={icons.googleSheet} alt="google-sheet" />
    <div>
      <div>Import from Google Sheets</div>
      <div>Import addresses with Google sheet URL</div>
      <input placeholder="Google sheet URL..." />
      <div>
        <button className="ms-btn">Import ↓</button>
      </div>
    </div>
  </div>
);
