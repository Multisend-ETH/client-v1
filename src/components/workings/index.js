import React from "react";
import Step from "./steps";
import imgs from "./../../assets/imgs/index";
import './index.css'

export default () => (
  <section id="help" className="flex-container steps">
    <h3>HOW IT WORKS</h3>
    <div className="flex-container step-mobile">
      <Step
        image={imgs.link}
        alt="link-account"
        topic="Connect to Metamask"
        content="We do not expose you to risks by asking for your private keys"
      />
      <Step
        image={imgs.add}
        alt="add-address"
        topic="Add Addresses"
        content="Add addresses manually or import from Google sheets"
      />
      <Step
        image={imgs.send}
        alt="hit-send"
        topic="Hit 'Send'"
        content="You're good to go. Your Ether or tokens are distributed to all added addresses at once!"
      />
    </div>
  </section>
);
