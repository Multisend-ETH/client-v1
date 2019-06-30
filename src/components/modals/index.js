import React from "react";
import ConfirmTxn from "./confirmTxn";
import GoogleSheetImporter from "./gsImport";
import SuccessBox from "./successTxn";
import ErrorModal from "./errorModal";
import "./index.css";
import { withContext } from './../../provider/index';


class Modals extends React.Component {
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside, false);
  }

  handleClickOutside = event => {
    if(this.props.ctx.modalName){
      if (!this.node.contains(event.target)) {
        this.props.ctx.closeModal()
      }
    }
  };

  render() {
    let Modal, hide;
    const {ctx} = this.props;
    switch (ctx.modalName) {
      case "confirm":
        Modal = ConfirmTxn;
        break;
      case "gsheet":
        Modal = GoogleSheetImporter;
        break;
      case "success":
        Modal = SuccessBox;
        break;
      case "error":
        Modal = ErrorModal
        break;
      default:
        Modal = () => <React.Fragment />;
        hide = "hidden";
    }
    return (
      <div className={`flex-container modal ${hide}`}>
        <Modal Ref={node => (this.node = node)} />
      </div>
    );
  }
}

export default withContext(Modals)