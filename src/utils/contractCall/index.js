import Web3 from 'web3';
import bulksendContractDetails from './contractDetails';

let web3;

if (window.ethereum) {
  web3 = new Web3(window.ethereum);
} else {
  console.log('Legacy browser');
  web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7545');
  if (!web3.currentProvider.isMetaMask) {
    //pass
  }
}

const { TOKEN_ABI, ABI, contractAddress } = bulksendContractDetails;
const bulksendContract = new web3.eth.Contract(ABI, contractAddress);

const enableMetamask = async () => {
  if (window.ethereum) {
    return window.ethereum
      .enable()
      .then(async () => {
        const acct = await getcurrAcct();
        return acct;
      })
      .catch(() => console.log("user denied this")
       );
  }
  else{
    return null
  }

};

const checkMetamask = async () => {
  if (!window.ethereum) {
    return false;
  }

};

const getNetwork = async () => {
  return web3.eth.net.getNetworkType()
};

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

const BN = web3.utils.BN;
const bulksend = async (
  addressArr,
  _amountArr,
  _value = 0,
  fn = console.log
) => {
  const currAccount = await getcurrAcct();
  let amountArr = [];
  for (const a of _amountArr) {
    amountArr.push(web3.utils.toWei(a.toString(), 'ether'));
  }
  let value = new BN(_value)
  for (const amnt of amountArr) {
    value = value.add(new BN(amnt))
  }
  const fee = await bulksendContract.methods.sendEthFee().call();
  console.log("fee", fee)
  value = (value.add(new BN(Number(fee)))).toString();

  // concat 0s to amount array if the length is less than 0 to prevent undefined error
  amountArr = amountArr.concat(Array(100 - amountArr.length).fill('0'));
  addressArr = addressArr.concat(
    Array(100 - addressArr.length).fill(
      '0x0000000000000000000000000000000000000000'
    )
  );
  try {
    bulksendContract.methods
      .multiSendEther(addressArr, amountArr)
      .send({
        from: currAccount,
        value: value
      })
      .on('transactionHash', async txHash => {
        console.log(txHash);
        fn(txHash);
      });
    return;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const ten = new BN(10)
const bulkSendToken = async (
  tokenAddress,
  addressArr,
  _amountArr,
  _value = 0,
  fn = console.log
) => {
  const currAccount = await getcurrAcct();
  let amountArr = [];
  let total = new BN(0);
  const sendTokenfee = await bulksendContract.methods.sendTokenFee().call();
  const token = new web3.eth.Contract(TOKEN_ABI, tokenAddress);
  const _tokenDecimals = await token.methods.decimals().call();
  const tokenDecimals = new BN(Number(_tokenDecimals))
  console.log(tokenDecimals)
  for (const a of _amountArr) {
    console.log((Number(a) * 10**10).toString())
    const _bigA = new BN((Number(a) * 10**10).toString())
    const powTenA = _bigA.mul(ten.pow(tokenDecimals))
    const bigA = powTenA.div(ten.pow(ten))
    amountArr.push(bigA.toString());
    total = total.add(bigA)
  }
  let value = new BN(_value)
  value = (value.add(new BN(Number(sendTokenfee)))).toString()
  total = total.toString()
  console.log(total, value, amountArr)
  try {
    token.methods
      .approve(contractAddress, total)
      .send({
        from: currAccount
      })
      .on('transactionHash', async hash => {
        console.log(hash);
        amountArr = amountArr.concat(Array(100 - amountArr.length).fill('0'));
        addressArr = addressArr.concat(
          Array(100 - addressArr.length).fill(
            '0x0000000000000000000000000000000000000000'
          )
        );
        bulksendContract.methods
          .multiSendToken(tokenAddress, addressArr, amountArr)
          .send({
            from: currAccount,
            value: value
          })
          .on('transactionHash', async txHash => {
            console.log(txHash);
            fn(txHash);
          });
        return hash;
      });
  } catch (err) {
    return null;
  }
};

const getTokenSymbol = async tokenAddress => {
  try {
    const currAccount = await getcurrAcct();
    const token = new web3.eth.Contract(TOKEN_ABI, tokenAddress);
    const tokenSymbol = await token.methods
      .symbol()
      .call({ from: currAccount });
    return tokenSymbol;
  } catch (err) {
    console.log(err);
    return '';
  }
};

const ethApi = {
  bulksend,
  getContractBal,
  bulkSendToken,
  getTokenSymbol,
  enableMetamask,
  getcurrAcct,
  checkMetamask,
  getNetwork
};

export default ethApi;
