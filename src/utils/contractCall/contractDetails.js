const contractAddress = "0x19054018704Bf85101eE221937dfc3632b532870" //"0x941F40C2955EE09ba638409F67ef27C531fc055C"// "0xbbf289d846208c16edc8474705c748aff07732db"//"0x51f7e36af8b88c6f98dbd6f24a7391c4bee2783c"//"0x6a7d7bce0424f369082c4b85bc3a72db4bf85e09" // "0x8d86af02ca70e72afb7d17ad63818832a9456579"; // "0xcc431cf73e9e085ff530938c260ef9b8c09ad2f5";
const ABI = [
  {
    "name": "__init__",
    "outputs": [],
    "inputs": [],
    "constant": false,
    "payable": true,
    "type": "constructor"
  },
  {
    "name": "multiSendEther",
    "outputs": [{ "type": "bool", "name": "out" }],
    "inputs": [
      { "type": "address[100]", "name": "addresses" },
      { "type": "uint256[100]", "name": "amounts" }
    ],
    "constant": false,
    "payable": true,
    "type": "function",
    "gas": 3602628
  },
  {
    "name": "multiSendToken",
    "outputs": [{ "type": "bool", "name": "out" }],
    "inputs": [
      { "type": "address", "name": "tokenAddress" },
      { "type": "address[100]", "name": "addresses" },
      { "type": "uint256[100]", "name": "amounts" }
    ],
    "constant": false,
    "payable": true,
    "type": "function",
    "gas": 296324
  },
  {
    "name": "getBalance",
    "outputs": [{ "type": "uint256", "name": "out" }],
    "inputs": [{ "type": "address", "name": "_address" }],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 803
  },
  {
    "name": "calc_total",
    "outputs": [{ "type": "uint256", "name": "out" }],
    "inputs": [{ "type": "uint256[100]", "name": "numbs" }],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 41676
  },
  {
    "name": "find",
    "outputs": [{ "type": "uint256", "name": "out" }],
    "inputs": [
      { "type": "uint256[100]", "name": "numbs" },
      { "type": "int128", "name": "n" }
    ],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 1183
  },
  {
    "name": "deposit",
    "outputs": [{ "type": "bool", "name": "out" }],
    "inputs": [],
    "constant": false,
    "payable": true,
    "type": "function",
    "gas": 343
  },
  {
    "name": "withdrawEther",
    "outputs": [{ "type": "bool", "name": "out" }],
    "inputs": [
      { "type": "address", "name": "_to" },
      { "type": "uint256", "name": "_value" }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 35639
  },
  {
    "name": "withdrawToken",
    "outputs": [{ "type": "bool", "name": "out" }],
    "inputs": [
      { "type": "address", "name": "tokenAddress" },
      { "type": "address", "name": "_to" },
      { "type": "uint256", "name": "_value" }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 2799
  },
  {
    "name": "setSendTokenFee",
    "outputs": [{ "type": "bool", "name": "out" }],
    "inputs": [{ "type": "uint256", "name": "_sendTokenFee" }],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 35851
  },
  {
    "name": "setSendEthFee",
    "outputs": [{ "type": "bool", "name": "out" }],
    "inputs": [{ "type": "uint256", "name": "_sendEthFee" }],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 35873
  },
  {
    "name": "destroy",
    "outputs": [],
    "inputs": [{ "type": "address", "name": "_to" }],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 25924
  },
  {
    "name": "owner",
    "outputs": [{ "type": "address", "name": "out" }],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 813
  },
  {
    "name": "sendTokenFee",
    "outputs": [{ "type": "uint256", "name": "out" }],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 843
  },
  {
    "name": "sendEthFee",
    "outputs": [{ "type": "uint256", "name": "out" }],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 873
  }
];

const TOKEN_ABI = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_spender",
        type: "address"
      },
      {
        name: "_value",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_from",
        type: "address"
      },
      {
        name: "_to",
        type: "address"
      },
      {
        name: "_value",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        name: "",
        type: "uint8"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address"
      },
      {
        name: "_value",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address"
      },
      {
        name: "_spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    payable: true,
    stateMutability: "payable",
    type: "fallback"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  }
];

const bulksendContractDetails = {
  ABI,
  contractAddress,
  TOKEN_ABI
};

export default bulksendContractDetails;
