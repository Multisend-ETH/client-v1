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
      auth: false,
      loading: false,
      amount: [],
      addresses: [],
      amounts: [],
      newAddress: "",
      newAmount: "",
      txHash: "",
      sending: false,
      tokenSymbol: "",
      modalName: "",
      errorMessage: "",
      tipAddress: "0x0663dC599539F98F4b319fA3ceED721D63DecA7c",
      tipAmount: "",
      tip: false,
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
