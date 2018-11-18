import React from "react";
import "./index.css";
import icons from "./../../assets/icons/index";

export default () => (
  <section className="built-with">
    <h3>BUILT WITH VYPER</h3>
    <p>
      Multisend is the first production ready Dapp to be built with Vyper - The
      new Ethereum Programming Language
    </p>
    <button className="ms-btn wt-icon ms-brown-bg ">
      LEARN ABOUT VYPER <img src={icons.diagonalArrow} alt="icon" />
    </button>
  </section>
);
