import React from "react";
import ReactDOM from "react-dom";
import 'normalize.css';
import "./assets/css/style.css"
import MultiSend from "./App";
import Provider from "./provider";

ReactDOM.render(
  <Provider>
    <MultiSend />
  </Provider>,
  document.getElementById("root")
);
