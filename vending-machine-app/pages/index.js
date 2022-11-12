/* eslint-disable react-hooks/rules-of-hooks */
import styles from "../styles/VendingMachine.module.css";
import "bulma/css/bulma.css";
import Head from "next/head";
import Web3 from "web3";
import { useState, useEffect } from "react";
import vmContract from "../blockchain/vending";
// m,dKK@;fl99

//metamask api provides ethereum provider api. global object, injected in window
//window.ethereum request account form metamask allow us to connect blockchain, this is a provider api
//web3.eth = for ethereum conenction
//web3.eth.contract = to create local copy of contract
const vendingMachine = () => {
  const [err, setErr] = useState("");
  const [inventory, setInventory] = useState(0);
  useEffect(() => {
    getInventoryHandler();
  }, []);

  //to read from contract we use call
  //to write in contract we use send
  const getInventoryHandler = async () => {
    const inv = await vmContract.methods.getVendingMachine().call();
    setInventory(inv);
    console.log(inv);
  };
  const connectWalletHandler = async () => {
    // alert("connect wallet");
    if (typeof window !== undefined && typeof window.ethereum !== undefined) {
      try {
        //connect to metamask
        window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        console.log(web3);
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
            <h2>Total inventory : {inventory}</h2>
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
