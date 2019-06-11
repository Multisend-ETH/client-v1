import React from 'react';
import "./index.css";
import imgs from './../../assets/imgs/index';
import Button from "..//ButtonWithRouter";
import { withContext } from './../../provider/index';

export default withContext(({ ctx, beta}) => {

  const BetaImg = beta ? <img className="beta-icon" src={beta} alt="beta"/> : null


 const joe = () => {
  if (ctx.network === "main"){
    return <Button  customStyle="ms-btn wt-icon  livenet">
        {ctx.network} net
      </Button>    
  } else{
    return <Button  customStyle="ms-btn wt-icon  testnet">
        {ctx.network}
      </Button>   
  }
 }


  return (
    <header className="flex-container top-bar">
        <a href="/">
        <img className="multisend-logo" src={imgs.multisendWithIcon} alt="logo" />
        {BetaImg}
        </a>
      <ul>
        <li>
          <a href="/">ABOUT</a>
        </li>
        <li>
          <a href="#contact">CONTACT</a>
        </li>
        <li>
          <a href="#help">FAQ</a>
        </li>
      </ul>
     
      {
        ctx.network === "" ? (
          <Button to="connect" customStyle="ms-btn wt-icon ms-green-bg">
        SEND <span className="send-arrow">↗</span>
      </Button>
        ) : 
        joe()
      }
      
    </header>
  );
}
)