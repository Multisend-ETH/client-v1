import React from "react";
import icons from './../../assets/icons/index';
import './index.css'

export default () => (
  <div className="board shadowize gs-modal donation-board">
    <img src={icons.donate} alt="donate-box" />
    <div>
      <div>Donate To MultiSend</div>
      <div>
          Like MultiSend? Do you enjoy our service? Help us
          keep the product going and constantly improving by 
          donating to any of the addresses below.
      </div>
      <div className="donation-address">
          <div>ETH: 0x</div>
          <div>BTC: 1btc</div>
      </div>
    </div>
  </div>
);
