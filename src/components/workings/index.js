import React from "react";
import Step from "./steps";
import './index.css'

export default () => (
  <section className="flex-container steps">
    <h3>HOW IT WORKS</h3>
    <div className="flex-container">
      <Step
        topic="Connect to Metamask"
        content="We don't expose you to risks by asking"
      />
      <Step
        topic="Add Addresses"
        content="Add addresses manually or import from Google sheets"
      />
      <Step
        topic="Hit 'Send'"
        content="You're good to go. Your Ether or tokens are distributed to all added addresses at once!"
      />
    </div>
  </section>
);
