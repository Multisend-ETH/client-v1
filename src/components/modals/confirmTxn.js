import React from "react";

export default () => (
  <div className="board shadowize gs-modal confirm-txn">
    <div>
      <div>Confirm Transaction</div>
      <div>You are about to distribute 0.33 ETH to 23 addresses</div>
      <div>
        <button className="ms-btn cancel-btn">cancel</button><button className="ms-btn confirm-btn">confirm</button>
      </div>
    </div>
  </div>
);
