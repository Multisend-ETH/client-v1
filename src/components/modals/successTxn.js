import React from "react";
import { withContext } from "./../../provider/index";
import Button from "../ButtonWithRouter";

export default withContext(({ Ref, ctx }) => (
  <div ref={Ref} className="board shadowize gs-modal success-txn">
    <div>
      <div>Transaction Successful!</div>
      <div className="success-msg">{`Your ${ctx.selected} has been succesfully distributed`}</div>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://etherscan.io/tx/${ctx.txHash}`}
      >
        View on etherscan
      </a>
      <div>
        <Button to="/send" handleClick={() => ctx.handleChange("modalName","")} customStyle="ms-btn back-btn vyper-btn">No thanks</Button>
        <Button to="donate" customStyle="ms-btn confirm-btn">Donate</Button>
      </div>
    </div>
  </div>
));
