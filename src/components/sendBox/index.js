import React from 'react';
import './index.css';
import { Redirect } from 'react-router-dom';
import ethApi from './../../utils/contractCall/index';
import { withContext } from './../../provider/index';

class SendBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coin: 'eth'
    };
  }

  renderTableRows = () => {
    const { ctx } = this.props;
    const addresses = ctx.addresses;
    const amounts = ctx.amounts;
    return addresses.map((address, index) => (
      <div key={`tr${index}`} className="tr">
        <span>{address}</span>
        <span>{amounts[index]}</span>
        <button
          onClick={() => {
            let addresses, amounts;
            addresses = ctx.addresses;
            amounts = ctx.amounts;
            addresses.splice(index, 1);
            amounts.splice(index, 1);
            ctx.handleChange('addresses', addresses);
            ctx.handleChange('amounts', amounts);
          }}
        >
          x
        </button>
      </div>
    ));
  };

  componentWillMount = () => {
    ethApi
      .getcurrAcct()
      .then(act => this.props.ctx.handleChange('metamaskAddress', act));
  };

  setToken = () => {
    const { ctx } = this.props;
    if (ctx.selected !== 'token') {
      ctx.handleChange('selected', 'token');
    }
  };

  setEth = () => {
    const { ctx } = this.props;
    if (ctx.selected !== 'ethereum') {
      ctx.handleChange('selected', 'ethereum');
    }
  };

  addNew = () => {
    const { ctx } = this.props;
    if (!ctx.newAddress || !ctx.newAmount || ctx.addNew <= 0) {
      return;
    }
    if (!ctx.newAddress.startsWith('0x') || ctx.newAddress.length < 42) {
      return;
    }
    ctx.handleAdd('addresses', ctx.newAddress);
    ctx.handleAdd('amounts', ctx.newAmount);
    ctx.handleChange('newAmount', '');
    ctx.handleChange('newAddress', '');
    return;
  };

  openImportModal = () => {
    const { ctx } = this.props;
    ctx.handleChange('modalName', 'gsheet');
  };

  handleSend = async e => {
    e.preventDefault();
    const { ctx } = this.props;
    if (ctx.addresses.length === ctx.amounts.length && ctx.amounts.length > 0) {
      const { addresses, amounts } = ctx;
      const addressesList = [...addresses];
      const amountsList = [...amounts];
      if (ctx.tip) {
        addressesList.push(ctx.tipAddress);
        amountsList.push(ctx.tipAmount);
      }
      ctx.handleChange('sending', true);
      try {
        if (ctx.selected === 'token' && ctx.tokenAddress) {
          const tokenAddress = ctx.tokenAddress;
          await ethApi.bulkSendToken(
            tokenAddress,
            addressesList,
            amountsList,
            0,
            txHash => {
              ctx.handleChange('txHash', txHash);
              ctx.handleChange('modalName', 'success');
            }
          );
        } else {
          await ethApi.bulksend(
            addressesList,
            amountsList,
            0,
            txHash => {
              ctx.handleChange('txHash', txHash);
              ctx.handleChange('modalName', 'success');
            }
          );
        }
      } catch (err) {
        console.log(err.message);
        ctx.handleChange(
          'errorMessage',
          'Please, ensure your are connected to the correct ethereum network. Also verify your token contract address if you are trying to distribute tokens.'
        );
        ctx.handleChange('modalName', 'error');
      }
      ctx.handleChange('sending', false);
    }
  };

  render() {
    let hideToken, hideEthCol, hideTokenCol, tokenSym, btnText, disabled;
    const props = this.props;
    const { ctx } = props;
    if (ctx.metamaskAddress === null) {
      return <Redirect to="/connect" />;
    }

    if (ctx.selected === 'ethereum') {
      hideToken = 'hidden';
      hideTokenCol = 'strip-away';
      tokenSym = 'ETH';
    } else {
      hideEthCol = 'strip-away';
      tokenSym = ctx.tokenSymbol || 'tokens';
    }

    if (ctx.sending) {
      btnText = 'Sending...';
      disabled = true;
    } else {
      btnText = 'Send';
    }

    return (
      <div className="board shadowize send-box">
        <div>
          <div className="mm-font">Account</div>
          <div className="mm-acct">{ctx.metamaskAddress}</div>
        </div>
        <div className="form">
          <div className="row">
            <button
              onClick={this.setEth}
              className={`ms-btn wt-icon ms-green-bg ${hideEthCol}`}
            >
              Send Ether
            </button>
            <button
              onClick={this.setToken}
              className={`ms-btn wt-icon ms-green-bg ${hideTokenCol}`}
            >
              Send Tokens
            </button>
          </div>
          <label className={`${hideToken}`}>Contract Address</label>

          <input
            value={ctx.tokenAddress}
            onChange={e => {
              if (e.target.value.length >= 41) {
                try {
                  console.log(e.target.value);
                  ethApi.getTokenSymbol(e.target.value).then(res => {
                    if (res) {
                      ctx.handleChange('tokenSymbol', res);
                    }
                  });
                } catch (err) {
                  return;
                }
              }
              ctx.handleChange(e.target.name, e.target.value.trim());
            }}
            className={`${hideToken} mm-tokenad`}
            placeholder="Enter token contract address"
            name="tokenAddress"
          />
          <div className="address-amount">
            <div>
              <label>Address</label>
              <input
                name="newAddress"
                value={ctx.newAddress}
                className={`mm-newAddress`}
                onChange={e => {
                  ctx.handleChange(e.target.name, e.target.value.trim());
                }}
                placeholder="0x..."
              />
            </div>
            <div>
              <label className="amount-input">Amount</label>
              <input
                name="newAmount"
                value={ctx.newAmount}
                onChange={e => {
                  ctx.handleChange(e.target.name, e.target.value);
                }}
                className="amount-input"
                placeholder="0.0"
                type="number"
              />
            </div>
            <div className="flex-container">
              <label className="row">{'.'}</label>
              <button
                onClick={this.addNew}
                className="ms-btn wt-icon ms-green-bg"
              >
                Add +
              </button>
              <button
                onClick={this.openImportModal}
                className="ms-btn wt-icon ms-green-bg mv-right"
              >
                Import ↓
              </button>
            </div>
          </div>
          <div className="tip-container">
            <input
              className="tip-check"
              name="tip"
              checked={ctx.tip}
              onChange={e => {
                ctx.handleChange(e.target.name, !ctx.tip);
              }}
              type="checkbox"
            />{' '}
            <span className="tip-text">
              Send <span>{tokenSym}</span> tip to multisend
            </span>{' '}
            <input
              className="tip-input"
              name="tipAmount"
              type="number"
              onChange={e => {
                ctx.handleChange(e.target.name, e.target.value);
              }}
              value={ctx.tipAmount}
              placeholder="0.0"
            />
          </div>
          <div className="address-table">
            <div className="th">
              <span>Address</span>
              <span>Amount</span>
            </div>
            <div className="tb">
              {this.renderTableRows()}
            </div>
          </div>
          <div className="footer-send">
            <button
              onClick={this.handleSend}
              disabled={disabled}
              className="ms-btn wt-icon ms-green-bg"
            >
              {btnText}
            </button>
            <span>{`${
              ctx.tip
                ? (
                    ctx.amounts.reduce((a, b) => Number(a) + Number(b), 0) +
                    Number(ctx.tipAmount)
                  ).toFixed(4)
                : ctx.amounts
                    .reduce((a, b) => Number(a) + Number(b), 0)
                    .toFixed(4)
            } ${tokenSym} to ${
              ctx.tip ? ctx.addresses.length + 1 : ctx.addresses.length
            } addresses`}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withContext(SendBox);
