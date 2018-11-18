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
      newAddress: "",
      newAmount: "",
      txHash: "",
      sending: false,
      tokenSymbol: "",
      openModal: false,

      handleAdd: (key, val) => {
        return this.setState(state => {
          state.ctx[key].push(val);
          return state;
        });
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
