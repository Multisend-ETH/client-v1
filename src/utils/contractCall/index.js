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
      .catch(() => console.log('user denied this'));
  } else {
    return null;
  }
};

const checkMetamask = async () => {
  if (!window.ethereum) {
    return false;
  }
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

const bulksend = async (
  addressArr,
  _amountArr,
  value = 0,
  fn = console.log
) => {
  const currAccount = await getcurrAcct();
  let amountArr = [];
  for (const a of _amountArr) {
    amountArr.push(web3.utils.toWei(a.toString(), 'ether'));
  }
  if (!value) {
    for (const amnt of amountArr) {
      value += Number(amnt);
    }
  }
  console.log(value);
  const fee = await bulksendContract.methods.sendEthFee().call();
  value = (Number(value) + Number(fee)).toString();

  // concat 0s to amount array if the length is less than 0 to prevent undefined error
  amountArr = amountArr.concat(Array(100 - amountArr.length).fill('0'));
  addressArr = addressArr.concat(
    Array(100 - addressArr.length).fill(
      '0x0000000000000000000000000000000000000000'
    )
  );
  console.log(amountArr, addressArr);
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
  const sendTokenfee = await bulksendContract.methods.sendTokenFee().call();
  const token = new web3.eth.Contract(TOKEN_ABI, tokenAddress);
  const tokenDecimals = await token.methods.decimals().call();
  for (const a of _amountArr) {
    total += Number(a) * 10 ** tokenDecimals;
    amountArr.push((Number(a) * 10 ** tokenDecimals).toString());
  }

  value = (Number(value) + Number(sendTokenfee)).toString();

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
  checkMetamask
};

export default ethApi;
