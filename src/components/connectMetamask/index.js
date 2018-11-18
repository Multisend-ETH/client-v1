import React from 'react'
import './index.css';
import imgs from './../../assets/imgs/index';

export default () => (
    <div className="flex-container shadowize board connect-metamask-board">
        <img src={imgs.metamask} alt="metamask-logo" />
        <div>
        <h2>Connect to Metamask</h2>
        <p>Connect & sign transaction via browser extension</p>
        </div>
        <button className="ms-btn">Connect</button>
    </div>
)