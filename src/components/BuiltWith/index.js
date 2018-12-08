import React from "react";
import "./index.css";

export default () => (
  <section className="built-with">
    <h3>BUILT WITH VYPER</h3>
    <p>
      Multisend is the first production ready Dapp to be built with Vyper - The
      new Ethereum Programming Language
    </p>
    <button onClick={() => window.open('https://github.com/ethereum/vyper')} className="ms-btn wt-icon ms-brown-bg vyper-btn">
      LEARN ABOUT VYPER <span className="send-arrow">↗</span>
    </button>
  </section>
);
