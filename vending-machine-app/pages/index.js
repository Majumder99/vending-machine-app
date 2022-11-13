/* eslint-disable react-hooks/rules-of-hooks */
import styles from "../styles/VendingMachine.module.css";
import "bulma/css/bulma.css";
import Head from "next/head";
import Web3 from "web3";
import { useState, useEffect } from "react";
import vendingMachineContract from "../blockchain/vending";
// m,dKK@;fl99

//metamask api provides ethereum provider api. global object, injected in window
//window.ethereum request account form metamask allow us to connect blockchain, this is a provider api
//web3.eth = for ethereum conenction
//web3.eth.contract = to create local copy of contract
const vendingMachine = () => {
  const [err, setErr] = useState("");
  const [inventory, setInventory] = useState(0);
  const [myDonuts, setMyDonuts] = useState(0);
  const [buyCount, setBuyCount] = useState(0);
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [vmContract, setVmContract] = useState(null);
  const [purchases, setPurchases] = useState(0);

  useEffect(() => {
    if (vmContract) {
      getInventoryHandler();
    }
    if (vmContract && account) {
      getMydonutConuntHandler();
    }
  }, [vmContract, account, purchases]);

  //to read from contract we use call
  //to write in contract we use send
  const getInventoryHandler = async () => {
    const inv = await vmContract.methods.getVendingMachineBalance().call();
    setInventory(inv);
    console.log(inv);
  };

  const getMydonutConuntHandler = async () => {
    // console.log(web3);
    const count = await vmContract.methods.donutBalances(account).call();
    setMyDonuts(count);
  };

  const buyDonuts = async () => {
    // console.log(buyCount);
    try {
      //GoerliETH
      console.log("before vmcontract");
      await vmContract.methods.purchase(buyCount).send({
        from: account,
        value: web3.utils.toWei("0.0000001", "ether") * buyCount,
      });
      setPurchases((c) => c + 1);
      // console.log(web3.utils.toWei("1", "ether") * buyCount);
      console.log("after vmcontract");
    } catch (error) {
      setErr(error.message);
    }
  };

  const connectWalletHandler = async () => {
    // alert("connect wallet");
    if (typeof window !== undefined && typeof window.ethereum !== undefined) {
      try {
        //connect to metamask
        //request wallet access
        window.ethereum.request({ method: "eth_requestAccounts" });
        //creating web3 instance
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);
        //get a list of accounts
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        setAccount(accounts[0]);

        //create local contract copy
        const vm = vendingMachineContract(web3);
        setVmContract(vm);
        // getMydonutConuntHandler();
        console.log({ web3, vm });
      } catch (error) {
        console.log(error.message);
        setErr(error.message);
      }
    } else {
      //install metamask
      alert("Install metamask");
    }
  };
  return (
    <>
      <div className={styles.main}>
        <Head>
          <title>Vending Machine</title>
          <meta name="description" content="A blockchain vending machine app" />
        </Head>
        <nav className="navbar mt-4 mb-4">
          <div className="container">
            <div className="navbar-brand">
              <h1>Vending Machine</h1>
            </div>
            <div className="navbar-end">
              <button
                onClick={connectWalletHandler}
                className="button is-primary"
              >
                Connect to wallet
              </button>
            </div>
          </div>
        </nav>
        <div>
          <div className="container">
            <h2>Total inventory : {inventory}</h2>
          </div>
        </div>
        <div>
          <div className="container">
            <h2>My donuts : {myDonuts}</h2>
          </div>
        </div>
        <div className="mt-5">
          <div className="container">
            <div className="field">
              <label htmlFor="" className="label">
                Buy donut
              </label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  placeholder="Enter amount..."
                  value={buyCount}
                  onChange={(e) => setBuyCount(e.target.value)}
                />
              </div>
              <button onClick={buyDonuts} className="button is-primary mt-5">
                Buy
              </button>
            </div>
          </div>
        </div>
        <div className="container">
          <p className="has-text-danger">{err}</p>
        </div>
      </div>
    </>
  );
};

export default vendingMachine;
