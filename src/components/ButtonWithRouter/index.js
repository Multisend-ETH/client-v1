import React from "react";

import { withRouter } from "react-router-dom";

const Button = props => {
  const { to, history, btnText, handleClick, customStyle } = props;
  return (
    <button
    className={customStyle}
      onClick={async e => {
        e.preventDefault();
        if (handleClick) {
          const resolved = await handleClick()
          if(resolved && to){
            return history.push(to);
          };
        } else {
          return history.push(to);
        }
      }}
    >
      {btnText}{props.children}
    </button>
  );
};

export default withRouter(({ history, to, btnText, ...rest }) => (
  <Button history={history} to={to} btnText={btnText} {...rest} />
));
