import React, { Component } from "react";

// import { Line, Circle } from "rc-progress";
// import Countdown from "react-countdown";

import Web3 from "web3";

import gangster from "../assets/gangster.png";
import ewt from "../assets/ewt.png";
import ammo from "../assets/ammo.png";
import gngLotto from "../assets/gngLotto.png";
import promoAbout from "../assets/promoAbout.png";
// import LotteryContract from "../../abis/Lottery.json";

// import gangster from "../assets/gangster.png";
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

class About extends Component {
  async componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch);
    //!CARREGAR INITIAL DATA;

    this.setState({});
  }

  async loadBlockchainData(dispatch) {
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      const netId = await web3.eth.net.getId();
      const blockAc = await web3.eth.getBlockNumber();

      console.log(netId);
      console.log(`Block: ${blockAc}`);
      // const algo = await web3.eth.Contract(dbank.abi,dbank.address);
      // console.log(algo.toString());
      const accounts = await web3.eth.getAccounts();

      //load balance
      if (typeof accounts[0] !== "undefined") {
        const balance = await web3.eth.getBalance(accounts[0]);
        this.setState({
          account: accounts[0],
          balance: web3.utils.fromWei(balance),
          web3: web3,
        });
      } else {
        window.alert("Please login with MetaMask");
      }

      //load contracts
      try {
        //     //! AQUI NO CONSTA LA NETWORK DE EWC
        //     //? Podria solucionarse, subiendo el contrato a la EWC (P.e. REMIX)
        //     //* Seria igual pero el Token.abi --> subido en la red EWC (deployed smart contract)
        //     // const PugInst = new web3.eth.Contract(Token.abi, PUG.address);
        //     const ammoContract = new web3.eth.Contract(
        //       Token.abi,
        //       Token.networks[netId].address
        //     );
        //     //* FAKE PUG_EWT
        //     const fake_ewt_contract = new web3.eth.Contract(
        //       Ewt_Fake.abi,
        //       Ewt_Fake.networks[netId].address
        //     ); //'0x7E77Fb69EEAf4Eafa7C0d2a8DdD151Fd3161e71c');
        //     const fake_ewt_clp = await fake_ewt_contract.methods
        //       .balanceOf(accounts[0])
        //       .call();
        //     const ewt_clp_wallet_balance = web3.utils.fromWei(fake_ewt_clp);
        //     //* FAKE PUG_AMMO
        //     const fake_ammo_contract = new web3.eth.Contract(
        //       Ammo_Fake.abi,
        //       Ammo_Fake.networks[netId].address
        //     ); //'0x7E77Fb69EEAf4Eafa7C0d2a8DdD151Fd3161e71c');
        //     const fake_ammo_clp = await fake_ammo_contract.methods
        //       .balanceOf(accounts[0])
        //       .call();
        //     const ammo_clp_wallet_balance = web3.utils.fromWei(fake_ammo_clp);
        //     console.log(Token.networks[netId].address);
        //     const masterChef = new web3.eth.Contract(
        //       MasterChef.abi,
        //       MasterChef.networks[netId].address
        //     );
        //     console.log(MasterChef.networks[netId].address);
        //     const ammo_wallet_wei = await ammoContract.methods
        //       .balanceOf(this.state.account)
        //       .call();
        //     const ammoAddress = Token.networks[netId].address;
        //     const ammo_wallet_balance = web3.utils.fromWei(ammo_wallet_wei);
        //     const feeAddress = await masterChef.methods.getFeeAddress().call();
        //     let user_farm_0 = await masterChef.methods
        //       .userInfo(0, this.state.account)
        //       .call();
        //     let user_farm_1 = await masterChef.methods
        //       .userInfo(1, this.state.account)
        //       .call();
        //     let pdt_rewards_0 = await masterChef.methods
        //       .pendingSushi(0, this.state.account)
        //       .call();
        //     let pdt_rewards_1 = await masterChef.methods
        //       .pendingSushi(1, this.state.account)
        //       .call();
        //     console.log(web3.utils.fromWei(user_farm_0.amount));
        //     console.log(web3.utils.fromWei(user_farm_0.rewardDebt));
        //     const depo_clp_ewt_amount = web3.utils.fromWei(user_farm_0.amount);
        //     const depo_clp_ammo_amount = web3.utils.fromWei(user_farm_1.amount);
        //     let containReward_0 = web3.utils.fromWei(pdt_rewards_0);
        //     let containRewar_1 = web3.utils.fromWei(pdt_rewards_1);
        //     let reward_farm_0 = (+containReward_0).toFixed(2);
        //     let reward_farm_1 = (+containRewar_1).toFixed(2);
        //     console.log("AMMO TO HARVEST Î");
        //     // let ewt_lp_rewards = (+reward_farm_0).toFixed(5);
        //     // console.log(ewt_lp_rewards);
        //     const farmContracts = [fake_ewt_contract, fake_ammo_contract];
        //     console.log();
        //     console.log(reward_farm_1);
        //     this.setState({
        //       //! AMMO
        //       ammo: ammoContract,
        //       ammoAddress: ammoAddress,
        //       //! MasterChef
        //       masterChef: masterChef,
        //       masterChefAddress: MasterChef.networks[netId].address,
        //       feeAddres: feeAddress,
        //       //! All_Farms
        //       farmContracts: farmContracts,
        //       //?Farm_0
        //       reward_ewt_pdt_ammo: reward_farm_0,
        //       depo_clp_ewt_amount: depo_clp_ewt_amount,
        //       //?Farm_1
        //       reward_ammo_pdt_ammo: reward_farm_1,
        //       depo_clp_ammo_amount: depo_clp_ammo_amount,
        //       //? User Globals
        //       ewt_clp_wallet_balance: ewt_clp_wallet_balance,
        //       ammo_clp_wallet_balance: ammo_clp_wallet_balance,
        //       ammo_wallet_balance: ammo_wallet_balance,
        //       //* Progra Globals
        //       web3: web3,
        //       netId: netId,
        //     });
      } catch (e) {
        console.log("Error", e);
        window.alert("Contracts not deployed to the current network");
      }
    } else {
      window.alert("Please install MetaMask");
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

      //TODO: End Lottery state
      //   //*Globals
      //   web3: "undefined",
      //   masterChef: null,
      //   netId: null,
      //   feeAddress: null,
      //   //?UserGlobals
      //   account: "",
      //   balance: 0,
      //   //!Balances
      //   //* PUG_EWT
      //   ewt_clp_wallet_balance: 0,
      //   reward_ewt_pdt_ammo: 0.0,
      //   depo_clp_ewt_amount: 0,
      //   input_lp_ewt: 0,
      //   //* PUG_AMMO
      //   ammo_clp_wallet_balance: 0,
      //   reward_ammo_pdt_ammo: 0.0,
      //   depo_clp_ammo_amount: 0,
      //   input_lp_ammo: 0,
      //   //! Contracts&Addresses
      //   farmContracts: [],
      //   ammo: null,
      //   masterChefAddress: null,
      //   //?* State Management
      //   pair: null,
    };
  }
  render() {
    return (
      <div class="page" style={{ background: "black" }}>
        <div class="pot-banner">
          <div class="wrapper">
            <div class="banner-wrapper">
              <div class="txt-wrapper">
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <span class="title">Welcome to G$wap</span>
                <span class="sub-title">
                  <font color="white">
                    <font size="+2">
                      <b>Tired of just Holding your Gangster LPs?</b>
                    </font>
                    <br />
                    <br /> Here is G
                    <font color="ec6998" size="+1">
                      $
                    </font>
                    wap to reward you with $
                    <font color="ec6998" size="+2">
                      AMMO
                    </font>{" "}
                    for providing liquidity to the most Gangster Pools ever
                    created in EWC.
                    <br /> We are launching our first{" "}
                    <font color="ec6998">G</font>event on 30th of June. This
                    event contest has a prize reward of up to{" "}
                    <font color="ec6998" size="+1">
                      1M
                    </font>
                    $ or 125.000 EWT.
                    <br />
                    <br />
                    This contest is not just about winning is about supporting
                    and adding small amount of value to the project. And as we
                    are a really gangster community what beter way that give
                    someone of our PUG community the possibility of become a
                    millionare with our opening.
                  </font>
                </span>
                <br></br>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span class="title" align="center">
                    <font color="ec6998">
                      <i>
                        Participating is just{" "}
                        <font color="white">0,5 EWT </font> (less than 2,75$) so
                        the contribution is small compared with the{" "}
                        <font color="white">G</font>$
                        <font color="white">wap </font>
                        <font color="white">POT</font> <br />
                        The biggest <font color="white">Reward Prize</font> ever
                        emmited in EWC, keep that in main.
                      </i>
                    </font>
                  </span>
                </div>
                <br />
                <br></br>
                <div>
                  <span class="title" align="right">
                    <font color="white">
                      <i>
                        "There is no need to say it but as Pug Father I should
                        just tell that every early supporter will be someway
                        rewarded for their Loyalty to the PUG Mafia"
                      </i>
                    </font>
                  </span>
                </div>
                <br />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span class="title" align="center">
                    <font color="white">
                      <b>
                        <i>From Gangsters to Gangsters</i>
                      </b>
                    </font>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br></br>
        {/* <div class="container pg">
          <div class="pot-list">
            <div class="pot-item farming premium">
              <div class="pot-status-wrapper">
                <div class="pot-status farming premium">
                  <font color="ec6998">1 Winner</font>
                </div>
                <div class="pot-token">7 DAYS LOCKED</div>
              </div>

              <div class="title">
                <img src={gangster} height="100" width="100px" alt="token" />

                <div
                  class="pot-jackpot premium"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  PUG POT
                </div>
              </div>

              <span class="pot-estimated">$74,869.82</span>
              <span class="pot-timestamp">
                <span class="pot-timestamp">
                  Countdown to Pot Open: <Countdown date={startContest_1} />
                </span>
              </span>
              <div class="pot-divide"></div>
              <div class="pot-status-wrapper">
                <div class="pot-token">Total Deposit</div>
                <div class="pot-token">284,479.65 BUNNY</div>
              </div>
              <div class="bunny-button default clickable no-select deep-purple">
                <div class="content">
                  View more<div class="subtext"></div>
                </div>
              </div>
            </div>
            <div class="pot-item farming jackpot">
              <div class="pot-status-wrapper">
                <div class="pot-status farming jackpot">farming</div>
                <div class="pot-token">7 DAYS LOCKED</div>
              </div>
              <div class="pot-jackpot-title">
                <img src={gangster} height="170px" width="170px" alt="token" />
                <span class="pot-jackpot jackpot">BUNNY jackpot</span>
              </div>
              <span class="pot-estimated">$38,253.29</span>
              <span class="pot-timestamp">
                <span class="pot-timestamp">
                  Countdown to Pot Closes: <Countdown date={endContest_1} />
                </span>
              </span>
              <div class="pot-divide"></div>
              <div class="pot-status-wrapper">
                <div class="pot-token">Total Deposit</div>
                <div class="pot-token">145,349.38 BUNNY</div>
              </div>
              <div class="bunny-button default clickable no-select deep-purple">
                <div class="content">
                  View more<div class="subtext"></div>
                </div>
              </div>
            </div>
            <div class="pot-item empty ">
              <img src={gngLotto} alt="cooking" />
              <span>More Coming soon</span>
              <span>This is just the begining</span>
            </div>
          </div>
        </div> */}

        <br></br>
        <div class="container pg">
          <div
            class="pot-list"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img className="home-card-image" src={promoAbout} />
          </div>
        </div>

        <br></br>
      </div>
    );
  }
}

export default About;
