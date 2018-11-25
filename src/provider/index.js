import React from "react";

const Context = React.createContext({});

export const withContext = WrappedComponent => props => (
  <Context.Consumer>
    {ctx => <WrappedComponent ctx={ctx} {...props} />}
  </Context.Consumer>
);

export default class Provider extends React.Component {
  state = {
    ctx: {
      tokenAddress: "",
      selected: "ethereum",
      url: "",
      loading: false,
      amount: [1.23],
      addresses: ['0x00B6845c6F47C770cE630B96df9BD4A6dA91C65d', '0x00B6845c6F47C770cE630B96df9BD4A6dA91C65d'],
      amounts: [0.1, 0.2],
      newAddress: "",
      newAmount: "",
      txHash: "",
      sending: false,
      tokenSymbol: "",
      modalName: "",
      metamaskAddress: "",

      handleAdd: (key, val) => {
        return this.setState(state => {
          state.ctx[key].push(val);
          return state;
        });
      },

      closeModal: () =>{
        return this.setState(state => {
          state.ctx.modalName = ""
          return state
        })
      },

      handleResetAddrAndAmnt: () => {
        return this.setState(state => {
          state.ctx.newAddress = "";
          state.ctx.newAmount = "";
          return state;
        });
      },

      handleChange: (key, newVal) => {
        return this.setState(state => {
          state.ctx[key] = newVal;
          return state;
        });
      }
    }
  };

  render() {
    return (
      <Context.Provider value={{ ...this.state.ctx }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
