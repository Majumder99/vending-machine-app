import Web3 from "web3";

const web3 = new Web3(
  "https://goerli.infura.io/v3/8f1ccefc9ed149919ca0ccebd9807acf"
);

//we are going export the copy of smart contract to the js files
const abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "donutBalances",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getVendingMachineBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "purchase",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "restock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const vmContract = new web3.eth.Contract(
  abi,
  "0x7e926eCc80103D9D58C51efC796D873d9575d5EF"
);

export default vmContract;
