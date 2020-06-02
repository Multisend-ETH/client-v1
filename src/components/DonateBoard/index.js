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
          <div>ETH: 0x79e688fACa70Ae47484187B6f1A650c4b6494E52</div>
          <div>BTC: 1MhAWz4vwSWDY5bSbyaMTqqNqjFDw6MDzx</div>
      </div>
    </div>
  </div>
);
