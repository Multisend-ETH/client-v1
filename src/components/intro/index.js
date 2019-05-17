import React from "react";
import "./index.css";
import icons from "./../../assets/icons/index";
import imgs from './../../assets/imgs/index';
import { RightBars, LeftBars } from './bars';
import Button from '../ButtonWithRouter';
import { withContext } from "./../../provider/index";

export default withContext(({ ctx }) => (
  <section className="flex-container intro">
    <div>
      <h2>
        Send Ether and Ethereum Tokens to{" "}
        <span className="ms-green">Multiple</span> Ethereum Addresses
      </h2>
      <p>
        With Multisend, you can distribute Ether and ERC-20 tokens to multiple wallet
        addresses at once with a single transaction fee. MultiSends saves you an
        incredible amount of time, energy and money in distributing Ethereum
        assets.
      </p>
      {
        ctx.auth ? (
          <Button to="/send" customStyle="ms-btn wt-icon ms-green-bg">
        START SENDING <span className="send-arrow">↗</span>
      </Button>
        ) : (
          <Button to="/connect" customStyle="ms-btn wt-icon ms-green-bg">
        START SENDING <span className="send-arrow">↗</span>
      </Button>
        )
      }
    </div>
    <div>
      {/* <div className="shadowize board" /> */}
      <img src={imgs.miniMultisend} alt="mini-multisend" />
    </div>
    <div>
      <h4>Get insights on our work, people and announcements</h4>
      <div>
        <div>
        <input placeholder="Email address... " />
        <button className="ms-btn wt-icon ms-green-bg">
          <img src={icons.rightArrow} alt="icon" />
        </button>
        </div>
      </div>
    </div>
    <RightBars />
    <LeftBars />
  </section>
));
