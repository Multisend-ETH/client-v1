import React from "react";
import "./index.css";

export default props => (
  <div className="board shadowize send-box">
    <div>
      <div>Metamask Address</div>
      <div>{props.address}0xjdnflsdnlnflsdnf</div>
    </div>
    <div className="form">
      <div className="row">
        <button className="ms-btn wt-icon ms-green-bg">Send Ether</button>
        <button className="ms-btn wt-icon ms-green-bg">Send Tokens</button>
      </div>
      <label>Contract Address</label>
      <input placeholder="Enter token contract address" name="tokenAddress" />
      <div className="address-amount">
        <div>
          <label>Address</label>
          <input placeholder="0x..." />
        </div>
        <div>
          <label className="amount-input">Amount</label>
          <input className="amount-input" placeholder="0.0" />
        </div>
        <div className="flex-container">
          <label className="row">{"."}</label>
          <button className="ms-btn wt-icon ms-green-bg">Add +</button>
          <button className="ms-btn wt-icon ms-green-bg">Import ↓</button>
        </div>
      </div>
      <div className="address-table">
        <div className="th">
          <span>Address</span>
          <span>Amount</span>
        </div>
        <div className="tb">
          <div className="tr">
            <span>0x01FD2b8c9C81044D37352704F1ce9adA7E1b6AE2</span>
            <span>0.02</span>
            <button>X</button>
          </div>
          <div className="tr">
            <span>address1</span>
            <span>0.02</span>
            <button>X</button>
          </div>
          <div className="tr">
            <span>address1</span>
            <span>0.02</span>
            <button>X</button>
          </div>
        </div>
      </div>
      <div className="footer-send">
        <button className="ms-btn wt-icon ms-green-bg">Send</button>
        <span>24 addresses</span>
      </div>
    </div>
  </div>
);
