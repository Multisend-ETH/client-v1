import React from "react";
import "./index.css";
import icons from "./../../assets/icons/index";
import imgs from './../../assets/imgs/index';

export default ({beta}) => {
  const BetaImg = beta ? <img className="beta-icon" src={beta} alt="beta"/> : null
  return (
    <header className="flex-container top-bar">
        <a href="/">
        <img className="multisend-logo" src={imgs.multisendWithIcon} alt="logo" />
        {BetaImg}
        </a>
      <ul>
        <li>
          <a href="/about">ABOUT</a>
        </li>
        <li>
          <a href="/contact">CONTACT</a>
        </li>
        <li>
          <a href="/help">HELP</a>
        </li>
      </ul>
      <button className="ms-btn wt-icon ms-green-bg">
        SEND <img src={icons.diagonalArrow} alt="icon" />
      </button>
    </header>
  );
}
