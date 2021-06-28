import React, { Component } from "react";

// import { Line, Circle } from "rc-progress";
// import Countdown from "react-countdown";

import Web3 from "web3";
import { useHistory } from "react-router-dom";

import pug from "./assets/gangster.png";

// import LotteryContract from "../../abis/Lottery.json";

// import pug from "../assets/pug.png";
// import ewt from "../assets/ewt.png";
// import ammo from "../assets/ammo.png";
// import gngLotto from "../assets/gngLotto.png";
// import premium from "../assets/app/premium.png";

// const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

// const startContest_0 = new Date(2021, 6, 29);
// const startContest_1 = new Date(2021, 6, 29);

// const endContest_0 = new Date(2021, 7, 5);
// const endContest_1 = new Date(2021, 7, 10);

// var now = Date.now();
// let dif = Math.round((endContest_0 - now) / oneDay);
// let openContest_0 = false;
// if (dif > 0) {
//   openContest_0 = true;
// }
const tokenABI = [
  {
    name: "Transfer",
    inputs: [
      { type: "address", name: "_from", indexed: true },
      { type: "address", name: "_to", indexed: true },
      { type: "uint256", name: "_value", indexed: false },
    ],
    anonymous: false,
    type: "event",
  },
  {
    name: "Approval",
    inputs: [
      { type: "address", name: "_owner", indexed: true },
      { type: "address", name: "_spender", indexed: true },
      { type: "uint256", name: "_value", indexed: false },
    ],
    anonymous: false,
    type: "event",
  },
  {
    name: "__init__",
    outputs: [],
    inputs: [
      { type: "bytes32", name: "_name" },
      { type: "bytes32", name: "_symbol" },
      { type: "uint256", name: "_decimals" },
      { type: "uint256", name: "_supply" },
    ],
    constant: false,
    payable: false,
    type: "constructor",
  },
  {
    name: "deposit",
    outputs: [],
    inputs: [],
    constant: false,
    payable: true,
    type: "function",
    gas: 74279,
  },
  {
    name: "withdraw",
    outputs: [{ type: "bool", name: "out" }],
    inputs: [{ type: "uint256", name: "_value" }],
    constant: false,
    payable: false,
    type: "function",
    gas: 108706,
  },
  {
    name: "totalSupply",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [],
    constant: true,
    payable: false,
    type: "function",
    gas: 543,
  },
  {
    name: "balanceOf",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [{ type: "address", name: "_owner" }],
    constant: true,
    payable: false,
    type: "function",
    gas: 745,
  },
  {
    name: "transfer",
    outputs: [{ type: "bool", name: "out" }],
    inputs: [
      { type: "address", name: "_to" },
      { type: "uint256", name: "_value" },
    ],
    constant: false,
    payable: false,
    type: "function",
    gas: 74698,
  },
  {
    name: "transferFrom",
    outputs: [{ type: "bool", name: "out" }],
    inputs: [
      { type: "address", name: "_from" },
      { type: "address", name: "_to" },
      { type: "uint256", name: "_value" },
    ],
    constant: false,
    payable: false,
    type: "function",
    gas: 110600,
  },
  {
    name: "approve",
    outputs: [{ type: "bool", name: "out" }],
    inputs: [
      { type: "address", name: "_spender" },
      { type: "uint256", name: "_value" },
    ],
    constant: false,
    payable: false,
    type: "function",
    gas: 37888,
  },
  {
    name: "allowance",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [
      { type: "address", name: "_owner" },
      { type: "address", name: "_spender" },
    ],
    constant: true,
    payable: false,
    type: "function",
    gas: 1025,
  },
  {
    name: "name",
    outputs: [{ type: "bytes32", name: "out" }],
    inputs: [],
    constant: true,
    payable: false,
    type: "function",
    gas: 723,
  },
  {
    name: "symbol",
    outputs: [{ type: "bytes32", name: "out" }],
    inputs: [],
    constant: true,
    payable: false,
    type: "function",
    gas: 753,
  },
  {
    name: "decimals",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [],
    constant: true,
    payable: false,
    type: "function",
    gas: 783,
  },
];

class NavBar extends Component {
  async componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch);
    //!CARREGAR INITIAL DATA;
  }

  async loadBlockchainData(dispatch) {
    window.ethereum.on("accountsChanged", function (accounts) {
      window.location.reload();
    });
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      const netId = await web3.eth.net.getId();
      const blockAc = await web3.eth.getBlockNumber();
      const pugContract = new web3.eth.Contract(
        tokenABI,
        "0x59b6196e41c118dfF75961257b882e86b915a0e8"
      );

      console.log(netId);
      console.log(`Block: ${blockAc}`);
      // const algo = await web3.eth.Contract(dbank.abi,dbank.address);
      // console.log(algo.toString());
      const accounts = await web3.eth.getAccounts();

      //load balance
      if (typeof accounts[0] !== "undefined") {
        const balance = await web3.eth.getBalance(accounts[0]);
        const pugBalance = await pugContract.methods
          .balanceOf(this.state.account)
          .call();

        this.setState({
          account: accounts[0],
          balance: web3.utils.fromWei(balance),
          web3: web3,
          pugBalance: pugBalance,
        });
      } else {
        window.alert("Please login with MetaMask");
      }

      //load contracts
      try {
      } catch (e) {
        console.log("Error", e);
        window.alert("Contracts not deployed to the current network");
      }
    } else {
      const result = await window.ethereum.enable();
      console.log(result);
      console.log(result);
      console.log(result);
      console.log(result);
      console.log(result);
      console.log(result);
      console.log(result);
      window.location.reload();

      //! AQUI
      // window.alert("Please install MetaMask");
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      //? Changable DATA:

      //TODO: Lottery state
      contest_0_winner: null,
      account: "",
      web3: "undefined",
      page: "about",
      pugBalance: 0,
    };
  }

  changePage = (e, page) => {
    this.setState({ page: page });
  };

  render() {
    return (
      <nav
        className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow"
        style={{
          background:
            "radial-gradient(100% 100% at 0px 0px, black, transparent), orange",
        }}
      >
        <a className="navbar-brand col-sm-2 col-md-2 mr-0" href="#/about">
          <img src={pug} className="App-logo" alt="logo" height="65" />
          <b>
            {" "}
            G<font color="ex6998">$</font>wap
          </b>
          <div className="content"></div>
        </a>
        <div className="nav-wrapper">
          <div className="topbar-nav no-select">
            <a class={"item clickable "} href="#/farms">
              <font color="ec6998">
                G<font size="1">$</font>
              </font>
              Farms
            </a>
            {/* <a class="item clickable" href="/zap">
                Swap
              </a> */}
            <a class="item clickable" href="#/lottery">
              <font color="ec6998">
                G<font size="1">$</font>
              </font>
              Lotto
            </a>
            {/* <a
                class="item clickable"
                href="https://explorer.energyweb.org/tokens/0x59b6196e41c118dfF75961257b882e86b915a0e8/token-holders"
                target="_blank"
                rel="noopener noreferrer"
              >
                Rank
              </a> */}
            <a
              class="item clickable"
              href="https://twitter.com/mobpug"
              target="_blank"
              rel="noopener noreferrer"
            >
              <font color="ec6998">
                G<font size="1"></font>
              </font>
              News
            </a>
          </div>
        </div>
        <div
          class="account-button"
          no-select
          href="https://twitter.com/mobpug"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div>
            <div class="bunny-price clickable">
              <font color="white">
                <b>
                  <font color="ec6998">PUG:</font>
                </b>{" "}
                0,0020
                <b>$</b>
              </font>
            </div>
          </div>

          <div class="account-button no-select"></div>
        </div>
        <div>
          <span>
            <font color="ec6998"> M</font>
            <font color="white">y PUG</font>
            <div>{this.state.pugBalance}</div>
          </span>
        </div>
        <a>
          {" "}
          <div
            class="bunny-button primary clickable no-select no-wrap"
            onClick={(e) => this.loadBlockchainData(e)}
          >
            <div class="content">
              {this.state.account == ""
                ? "Connect Wallet"
                : this.state.account.substr(0, 5) +
                  "***" +
                  this.state.account.substr(this.state.account.length - 4)}
            </div>
          </div>
        </a>
        <div style={{ width: "5px" }}></div>
      </nav>
    );
  }
}

export default NavBar;
