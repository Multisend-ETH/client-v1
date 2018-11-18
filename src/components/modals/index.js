import React from "react";
import ConfirmTxn from "./confirmTxn";
import GoogleSheetImporter from "./gsImport";
import SuccessBox from "./successTxn";
import "./index.css";

export default props => {
  let Modal, hide;
  switch (props.modalName) {
    case "confirm":
      Modal = ConfirmTxn;
      break;
    case "gsheet":
      Modal = GoogleSheetImporter
      break;
    case "success":
      Modal = SuccessBox;
      break;
    default:
      Modal = () => <div></div>;
      hide = "hidden";
  }
  return <div className={`flex-container modal ${hide}`}><Modal /></div>;
};
