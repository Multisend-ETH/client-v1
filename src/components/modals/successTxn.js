import React from "react";
import { withContext } from "./../../provider/index";
import Button from "../ButtonWithRouter";

export default withContext(({ Ref, ctx }) => (
  <div ref={Ref} className="board shadowize gs-modal success-txn">
    <div>
      <div>Transaction Successful</div>
      <div>You succesfully distributed 0.44 ETH</div>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://ropsten.etherscan.io/tx/${ctx.txHash}`}
      >
        View on etherscan
      </a>
      <div>
        <Button to="/send" handleClick={() => ctx.handleChange("modalName","")} customStyle="ms-btn back-btn">Back</Button>
        <Button to="donate" customStyle="ms-btn confirm-btn">Donate</Button>
      </div>
    </div>
  </div>
));
