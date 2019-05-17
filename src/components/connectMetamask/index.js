import React, {Component} from "react";
import "./index.css";
import imgs from "./../../assets/imgs/index";
import Button from "../ButtonWithRouter";
import ethApi from "./../../utils/contractCall/index";
import { withContext } from "./../../provider/index";
import Modal from 'react-modal'


// const openImportModal = () => {
//   const { ctx } = this.props;
//   ctx.handleChange("modalName", "gsheet");
// };


// export default withContext(({ ctx }) => (
//   <div className="flex-container shadowize board connect-metamask-board">
//     <img src={imgs.metamask} alt="metamask-logo" />
//     <div>
//       <h2>Connect to MultiSend</h2>
//       <p>Connect & sign transaction via browser extension</p>
//     </div>
//     <div>
//       <Button
//         to="/send"
//         handleClick={async () => {
//           const res = await ethApi.enableMetamask();
//           if (res){
//             ctx.handleChange("auth", true);
//             ctx.handleChange("metamaskAddress", res);
//             return res;
//           }else{
//             // return ({this.openImportModal})
//           }
         
//           }
//         }
//         customStyle="ms-btn"
//       >
//         Connect
//       </Button>
//     </div>
//   </div>
// ));

 class connectMetamask  extends Component{
  state = {
    modalIsOpen: false,
    secondModalIsOpen: false
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  openSecondModal = () => {
    this.setState({ secondModalIsOpen: true });
  };

  closeSecondModal = () => {
    this.setState({ secondModalIsOpen: false });
  };

  // openImportModal = () => {
  //   const { ctx } = this.props;
  //   ctx.handleChange("modalName", "gsheet");
  // };

  render(){
    const { ctx } = this.props;
  return(
    <div className="flex-container shadowize board connect-metamask-board">
    <img src={imgs.metamask} alt="metamask-logo" />
    <div>
      <h2>Connect to MultiSend</h2>
      <p>Connect & sign transaction via browser extension</p>
    </div>
    <div>
      <Button
        to="/send"
        handleClick={async () => {
          const ade = await ethApi.checkMetamask();
          if(ade === false){
            return this.openModal()
          } else{
          const res = await ethApi.enableMetamask();
          if(res === '1234'){
            return this.openModal()
          }else{

          
          ctx.handleChange("auth", true);
          ctx.handleChange("metamaskAddress", res);
          
          return res;
          }
          }
        }}
        customStyle="ms-btn"
      >
        Connect
      </Button>
       <Modal isOpen={this.state.modalIsOpen} ariaHideApp={false} onRequestClose={this.closeModal}>
           <img src={imgs.error} alt="error"/>
           <h2>Error in Connection</h2>
          <div>No web3 provider found. <br/> <span style={{color: '#1bbf0d'}}>For Desktop:</span><br/>
          please go to <span style={{textDecoration: 'underline'}}>https://metamask.io</span> install metamask and return to this page. <br/>
          <span style={{color: '#1bbf0d'}}>For Mobile:</span><br/>
          please go to your device appstore, download <span style={{textDecoration: 'underline'}}>Trustwallet or Status.im</span> open this page from within the app
          </div>
          <button onClick={this.closeModal}>Got it</button>
        </Modal>
    </div>
  </div>
  )
}
}
export default withContext(connectMetamask )