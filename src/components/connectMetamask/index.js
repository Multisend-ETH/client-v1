import React from 'react'
import './index.css';
import imgs from './../../assets/imgs/index';
import Button from '../ButtonWithRouter'
import ethApi from './../../utils/contractCall/index';
import { withContext } from './../../provider/index';

export default withContext(({ctx}) => (
    <div className="flex-container shadowize board connect-metamask-board">
        <img src={imgs.metamask} alt="metamask-logo" />
        <div>
        <h2>Connect to Metamask</h2>
        <p>Connect & sign transaction via browser extension</p>
        </div>
        <Button to='/send' handleClick={async () => {
            const res = await ethApi.enableMetamask()
            ctx.handleChange("metamaskAddress", res)
            return res
        }} customStyle="ms-btn">Connect</Button>
    </div>
))