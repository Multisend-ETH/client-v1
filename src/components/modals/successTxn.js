import React from "react";
import { withContext } from './../../provider/index';

export default withContext(({Ref, ctx}) => (
  <div ref={Ref} className="board shadowize gs-modal confirm-txn">
    <div>
      <div>Transaction Successful</div>
      <div>You succesfully distributed 0.44 ETH</div>
      <a href={`https://ropsten.etherscan.io/tx/${ctx.txHash}`}>View on etherscan</a>
      <div>
        <button className="ms-btn back-btn">Back</button><button className="ms-btn confirm-btn">Donate</button>
      </div>
    </div>
  </div>
));