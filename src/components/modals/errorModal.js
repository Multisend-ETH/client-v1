import React from 'react';
import { withContext } from './../../provider/index';
import Button from '../ButtonWithRouter';
import imgs from './../../assets/imgs';

export default withContext(({ Ref, ctx }) => (
  <div
    ref={Ref}
    className="board shadowize gs-modal success-txn error-msg-modal"
  >
    <img src={imgs.error} alt="error" />
    <div>An error occured!</div>
    <div className="err-msg">{ctx.errorMessage}</div>
    <span className="view-tut">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.useloom.com/share/ae5014b06ad745aa8f88b266a7aaff4f"
      >
        View tutorial here
      </a>
    </span>
    <Button
      to="/send"
      handleClick={() => ctx.handleChange('modalName', '')}
      customStyle="ms-btn back-btn vyper-btn"
    >
      Close
    </Button>
  </div>
));
