import Web3 from "web3";
import bulksendContractDetails from "./contractDetails";

let web3

if(window.ethereum){
  console.log('ethereum found')
  web3 = new Web3(window.ethereum)
  window.ethereum.enable().then(() => console.log('enabled')).catch(() => console.log('access denied'))
}else{
  console.log('Legacy browser')
  web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545")
  if(!web3.currentProvider.isMetaMask){
    window.alert("Metamask is not installed in this browser, Please Install metamask and login.")
  }
}

const { TOKEN_ABI, ABI, contractAddress } = bulksendContractDetails;
const bulksendContract = new web3.eth.Contract(ABI, contractAddress);

const getcurrAcct = () => {
  return web3.eth.getAccounts().then(acc => acc[0]);
};

const getContractBal = async () => {
  const currAccount = await getcurrAcct();
  console.log(currAccount);
  bulksendContract.methods
    .owner()
    .call()
    .then(owner => {
      console.log(owner);
    });
  bulksendContract.methods
    .getbalance(contractAddress)
    .call({ from: currAccount })
    .then(bal => console.log(bal));
};

const bulksend = async (
  addressArr,
  _amountArr,
  value = 0,
  fn = console.log
) => {
  const currAccount = await getcurrAcct();
  let amountArr = [];
  for (const a of _amountArr) {
    amountArr.push(web3.utils.toWei(a.toString(), "ether"));
  }
  if (!value) {
    for (const amnt of amountArr) {
      value += Number(amnt);
    }
  }
  console.log(value);
  const fee = await bulksendContract.methods.ethSendFee().call();;
  value = (Number(value) + Number(fee)).toString();
  bulksendContract.methods
    .bulkSendEth(addressArr, amountArr)
    .send({
      from: currAccount,
      //gasPrice: "",
      //gas: "",
      value: value
    })
    //.catch(e => console.log(e))
    .on("transactionHash", hash => fn(hash))
    .on("receipt", receipt => console.log(`receipt => ${receipt}`));
};

const bulkSendToken = async (
  tokenAddress,
  addressArr,
  _amountArr,
  value = 0,
  fn = console.log
) => {
  const currAccount = await getcurrAcct();
  let amountArr = [];
  let total = 0;
  const sendTokenfee = await bulksendContract.methods.tokenSendFee().call();
  const token = new web3.eth.Contract(TOKEN_ABI, tokenAddress);
  const tokenDecimals = await token.methods.decimals().call();
  for (const a of _amountArr) {
    total += Number(a) * 10 ** tokenDecimals;
    amountArr.push((Number(a) * 10 ** tokenDecimals).toString());
  }

  value = (Number(value) + Number(sendTokenfee)).toString();

  token.methods
    .approve(contractAddress, total)
    .send({
      from: currAccount
      //gasPrice: "",
      //gas: "",
    })
    .then(res => {
      if (res.transactionHash) {
        bulksendContract.methods
          .bulkSendToken(tokenAddress, addressArr, amountArr)
          .send({
            from: currAccount,
            //gasPrice: "",
            //gas: "",
            value: value
          })
          //.catch(e => console.log(e))
          .on("transactionHash", hash => fn(hash))
          .on("receipt", receipt => console.log(`receipt => ${receipt}`));
      }
    }).catch(err => err);
};

const getTokenSymbol = async (tokenAddress) => {
  try{
    const token = new web3.eth.Contract(TOKEN_ABI, tokenAddress);
    const tokenSymbol = await token.methods.symbol().call();
    return tokenSymbol
  }catch(err){
    console.log(err)
    return ""
  }
  
}

const ethApi = {
  bulksend,
  getContractBal,
  bulkSendToken,
  getTokenSymbol
};

export default ethApi;
