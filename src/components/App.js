import { Tabs, Tab } from "react-bootstrap";
import React, { Component } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
// import  Routes from './routes';

import Web3 from "web3";

import "./App.css";
// import EwtFarm from './ewtFarm.js';

//!FAKE -- delete!
import Ewt_Fake from "../abis/Ewt_lp.json";
import Ammo_Fake from "../abis/Ammo_lp.json";
//!end : FAKE -- delete!

import MasterChef from "../abis/MasterChef.json";
import Token from "../abis/SusuToken.json";

import dbank from "./assets/dbank.png";
import pugSusu from "./assets/pugSusu.png";
import logo from "./assets/logo.png";
import pugFather from "./assets/pugFather.png";
import pugEwt from "./assets/gang-ewt.png";
import pugEwtt from "./assets/pugEwtt.png";
import pugAmmo from "./assets/pugAmmo.png";
import pugUsdc from "./assets/pugUsdc.png";
import pugBnb from "./assets/pugBnb.png";
import gangster from "./assets/gangster.png";
import ammo from "./assets/ammo.png";

// const routes = (
//   <BrowserRouter>
//     <div>
//       <Switch>
//         <Route path="/" component={EwtFarm}></Route>

//       </Switch>
//     </div>
//   </BrowserRouter>
// );

class Home extends Component {
  async componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch);
  }

  // async loadContract(contact) {
  //   if (contract == 'PUG') {
  //     return await web3.eth.Contract();
  //   } else if (contract == 'EWT') {
  //     return await web3.eth.Contract();

  //   } else if (contract == 'SUSU') {
  //     return await web3.eth.Contract();

  //   } else {
  //     console.log('What the fuck are you loading?!');
  //   }
  // }

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
      console.log("Printing All Connected Accounts");
      for (let index = 0; index < accounts.length; index++) {
        console.log(accounts[index]);
      }
      console.log(accounts);
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
        //! AQUI NO CONSTA LA NETWORK DE EWC
        //? Podria solucionarse, subiendo el contrato a la EWC (P.e. REMIX)

        //* Seria igual pero el Token.abi --> subido en la red EWC (deployed smart contract)
        // const PugInst = new web3.eth.Contract(Token.abi, PUG.address);
        const ammoContract = new web3.eth.Contract(
          Token.abi,
          Token.networks[netId].address
        );
        //* FAKE PUG_EWT
        const fake_ewt_contract = new web3.eth.Contract(
          Ewt_Fake.abi,
          Ewt_Fake.networks[netId].address
        ); //'0x7E77Fb69EEAf4Eafa7C0d2a8DdD151Fd3161e71c');
        const fake_ewt_clp = await fake_ewt_contract.methods
          .balanceOf(accounts[0])
          .call();
        const ewt_clp_wallet_balance = web3.utils.fromWei(fake_ewt_clp);
        //* FAKE PUG_AMMO
        const fake_ammo_contract = new web3.eth.Contract(
          Ammo_Fake.abi,
          Ammo_Fake.networks[netId].address
        ); //'0x7E77Fb69EEAf4Eafa7C0d2a8DdD151Fd3161e71c');
        const fake_ammo_clp = await fake_ammo_contract.methods
          .balanceOf(accounts[0])
          .call();
        const ammo_clp_wallet_balance = web3.utils.fromWei(fake_ammo_clp);

        console.log(Token.networks[netId].address);
        const masterChef = new web3.eth.Contract(
          MasterChef.abi,
          MasterChef.networks[netId].address
        );
        console.log(MasterChef.networks[netId].address);
        const ammo_wallet_wei = await ammoContract.methods
          .balanceOf(this.state.account)
          .call();
        const ammoAddress = Token.networks[netId].address;
        const ammo_wallet_balance = web3.utils.fromWei(ammo_wallet_wei);

        const feeAddress = await masterChef.methods.getFeeAddress().call();

        let user_farm_0 = await masterChef.methods
          .userInfo(0, this.state.account)
          .call();
        let user_farm_1 = await masterChef.methods
          .userInfo(1, this.state.account)
          .call();

        let pdt_rewards_0 = await masterChef.methods
          .pendingSushi(0, this.state.account)
          .call();
        let pdt_rewards_1 = await masterChef.methods
          .pendingSushi(1, this.state.account)
          .call();

        console.log(web3.utils.fromWei(user_farm_0.amount));
        console.log(web3.utils.fromWei(user_farm_0.rewardDebt));

        const depo_clp_ewt_amount = web3.utils.fromWei(user_farm_0.amount);
        const depo_clp_ammo_amount = web3.utils.fromWei(user_farm_1.amount);

        let containReward_0 = web3.utils.fromWei(pdt_rewards_0);
        let containRewar_1 = web3.utils.fromWei(pdt_rewards_1);

        let reward_farm_0 = (+containReward_0).toFixed(2);
        let reward_farm_1 = (+containRewar_1).toFixed(2);

        console.log("AMMO TO HARVEST Î");

        // let ewt_lp_rewards = (+reward_farm_0).toFixed(5);
        // console.log(ewt_lp_rewards);
        const farmContracts = [fake_ewt_contract, fake_ammo_contract];
        console.log();
        console.log(reward_farm_1);
        this.setState({
          //! AMMO
          ammo: ammoContract,
          ammoAddress: ammoAddress,
          //! MasterChef
          masterChef: masterChef,
          masterChefAddress: MasterChef.networks[netId].address,
          feeAddres: feeAddress,
          //! All_Farms
          farmContracts: farmContracts,
          //?Farm_0
          reward_ewt_pdt_ammo: reward_farm_0,
          depo_clp_ewt_amount: depo_clp_ewt_amount,
          //?Farm_1
          reward_ammo_pdt_ammo: reward_farm_1,
          depo_clp_ammo_amount: depo_clp_ammo_amount,

          //? User Globals
          ewt_clp_wallet_balance: ewt_clp_wallet_balance,
          ammo_clp_wallet_balance: ammo_clp_wallet_balance,
          ammo_wallet_balance: ammo_wallet_balance,

          //* Progra Globals
          web3: web3,
          netId: netId,
        });
      } catch (e) {
        console.log("Error", e);
        window.alert("Contracts not deployed to the current network");
      }
    } else {
      window.alert("Please install MetaMask");
    }
  }

  //! DEPOSIT IN FARMS
  async deposit_ewt_clp(amount) {
    if (amount != 0) {
      const user_farm_0 = await this.state.farmContracts[0].methods
        .balanceOf(this.state.account)
        .call();
      const gas = new this.state.web3.utils.BN("1000000");
      const gasPrice = new this.state.web3.utils.BN("20000");

      console.log("user_farm_0");
      const dep_amount = this.state.web3.utils.toWei(amount);

      const deposit = new this.state.web3.utils.BN(dep_amount);
      const allow = deposit + gas * gasPrice;

      console.log(allow);
      console.log("depositing $FAKE-EWT$");
      console.log(amount);
      const fee = new this.state.web3.utils.BN("5000000000000000000");
      console.log(`Fee: ${fee}`);
      if (this.state.masterChef !== "undefined") {
        try {
          const feeAddress = await this.state.masterChef.methods
            .getFeeAddress()
            .call();
          console.log(fee);

          const allowed = await this.state.farmContracts[0].methods
            .approve(this.state.masterChefAddress, allow)
            .send({ from: this.state.account });

          //* Fee (5 AMMO)
          // await this.state.ammo.methods.transfer(feeAddress, fee).send({
          //   from: this.state.account,
          //   gas: gas,
          //   gasPrice: gasPrice,
          // });

          await this.state.masterChef.methods.deposit(0, deposit).send({
            from: this.state.account,
            gas: gas,
            gasPrice: gasPrice,
          });
          console.log("EVERYTHING WENT OKAY");
          window.location.reload();
        } catch (e) {
          console.log("Error, deposit: ", e);
        }
      }
    } else {
    }
  }

  async deposit_ammo_clp(amount) {
    if (amount != 0) {
      const user_farm_1 = await this.state.farmContracts[1].methods
        .balanceOf(this.state.account)
        .call();
      const gas = new this.state.web3.utils.BN("1000000");
      const gasPrice = new this.state.web3.utils.BN("20000");

      console.log("user_farm_0");
      const dep_amount = this.state.web3.utils.toWei(amount);

      const deposit = new this.state.web3.utils.BN(dep_amount);
      const allow = deposit + gas * gasPrice;
      const fee = new this.state.web3.utils.BN("5000000000000000000");
      console.log(allow);
      console.log("depositing $PUG-FAKE_AMMO$");
      console.log(amount);

      if (this.state.masterChef !== "undefined") {
        try {
          const feeAddress = await this.state.masterChef.methods
            .getFeeAddress()
            .call();
          const allowed = await this.state.farmContracts[1].methods
            .approve(this.state.masterChefAddress, allow)
            .send({
              from: this.state.account,
            });
          await this.state.ammo.methods.transfer(feeAddress, fee).send({
            from: this.state.account,
            gas: gas,
            gasPrice: gasPrice,
          });

          console.log("AT LEAST HERE");
          await this.state.masterChef.methods.deposit(1, deposit).send({
            from: this.state.account,
            gas: gas,
            gasPrice: gasPrice,
          });
          console.log("EVERYTHING WENT OKAY");
          window.location.reload();
        } catch (e) {
          console.log("Error, deposit: ", e);
        }
      }
    } else {
    }
  }

  //! END: DEPOSIT IN FARMS

  //! WITHDRAW IN FARMS

  async withdraw_ewt_clp(e) {
    const user_farm_0 = await this.state.masterChef.methods
      .userInfo(0, this.state.account)
      .call();
    const maxAmount = this.state.web3.utils.fromWei(user_farm_0.amount);
    const withdraw = new this.state.web3.utils.BN(
      this.state.web3.utils.toWei(maxAmount)
    );
    console.log("withdrawing $FAKE-EWT$");
    const gas = new this.state.web3.utils.BN("1000000");
    const gasPrice = new this.state.web3.utils.BN("200000");

    const ammoAddress = this.state.ammoAddress;
    console.log(ammoAddress);
    const currentAmmoBalance = await this.state.ammo.methods
      .balanceOf(this.state.account)
      .call();
    const fee = new this.state.web3.utils.BN("5000000000000000000");

    e.preventDefault();
    if (this.state.masterChef !== "undefined") {
      try {
        const feeAddress = await this.state.masterChef.methods
          .getFeeAddress()
          .call();

        //* Fee
        // await this.state.ammo.methods.transfer(feeAddress, fee).send({
        //   from: this.state.account,
        //   gas: gas,
        //   gasPrice: gasPrice
        // });

        await this.state.masterChef.methods
          .withdraw(0, withdraw)
          .send({ from: this.state.account });
        console.log(
          `You have ${this.state.web3.utils.fromWei(
            withdraw
          )} CLPs in your wallet! A part from your previous ammount: ${this.state.web3.utils.fromWei(
            currentAmmoBalance
          )}`
        );
        window.location.reload();
      } catch (e) {
        console.log("Error, withdraw: ", e);
      }
    }
  }

  async withdraw_ammo_clp(e) {
    const user_farm_1 = await this.state.masterChef.methods
      .userInfo(1, this.state.account)
      .call();
    const maxAmount = this.state.web3.utils.fromWei(user_farm_1.amount);
    const withdraw = new this.state.web3.utils.BN(
      this.state.web3.utils.toWei(maxAmount)
    );
    console.log("withdrawing $FAKE-EWT$");
    const ammoAddress = this.state.ammoAddress;
    const gas = new this.state.web3.utils.BN("1000000");
    const gasPrice = new this.state.web3.utils.BN("200000");
    console.log("ammoAddress");
    console.log(ammoAddress);
    const fee = new this.state.web3.utils.BN("5000000000000000000");

    const currentAmmoBalance = await this.state.ammo.methods
      .balanceOf(this.state.account)
      .call();

    e.preventDefault();
    if (this.state.masterChef !== "undefined") {
      try {
        const feeAddress = await this.state.masterChef.methods
          .getFeeAddress()
          .call();
        await this.state.ammo.methods.transfer(feeAddress, fee).send({
          from: this.state.account,
          gas: gas,
          gasPrice: gasPrice,
        });

        await this.state.masterChef.methods
          .withdraw(1, withdraw)
          .send({ from: this.state.account });
        window.location.reload();
      } catch (e) {
        console.log("Error, withdraw: ", e);
      }
    }
  }

  //! END: WITHDRAW IN FARMS

  constructor(props) {
    super(props);
    this.state = {
      //*Globals
      web3: "undefined",
      masterChef: null,
      netId: null,
      feeAddress: null,
      //?UserGlobals
      account: "",
      balance: 0,
      //!Balances

      //* PUG_EWT
      ewt_clp_wallet_balance: 0,
      reward_ewt_pdt_ammo: 0.0,
      depo_clp_ewt_amount: 0,
      input_lp_ewt: 0,

      //* PUG_AMMO
      ammo_clp_wallet_balance: 0,
      reward_ammo_pdt_ammo: 0.0,
      depo_clp_ammo_amount: 0,
      input_lp_ammo: 0,

      //! Contracts&Addresses
      farmContracts: [],
      ammo: null,
      masterChefAddress: null,

      //?* State Management
      pair: null,
    };
  }

  ChangeCLP_EWT_Amount = (event) => {
    console.log(event.target.value == undefined);
    if (event.target.value == undefined) {
      this.setState({ input_lp_ewt: this.state.ewt_clp_wallet_balance });
    } else {
      this.setState({ input_lp_ewt: event.target.value });
      //this opens in a new tab (believe that is what the owner of the question wanted if not you can do window.location.href = "/insert/your/path/here".
    }
  };
  ChangeCLP_AMMO_Amount = (event) => {
    //! Canviar les variables per AMMO vars
    console.log(event.target.value);
    if (event.target.value == undefined) {
      this.setState({ input_lp_ammo: this.state.ammo_clp_wallet_balance });
    } else {
      this.setState({ input_lp_ammo: event.target.value });
      //this opens in a new tab (believe that is what the owner of the question wanted if not you can do window.location.href = "/insert/your/path/here".
    }
  };

  //*Navigation

  //* END: Navigation

  render() {
    return (
      <div className="root">
        <div className="text-monospace">
          <br></br>
          <div className="page" style={{ background: "black" }}>
            <br></br>
            <br></br>
            <div class="pot-banner">
              <div class="wrapper">
                <div class="banner-wrapper">
                  <div class="txt-wrapper">
                    <span class="title">G$WAP Farming</span>
                    <span class="sub-title">
                      <font color="white">
                        The G$wap Farming is for those who support @mogpug
                        ($PUG) from the begining. Gangsters take care of other
                        Gangsters, at least Pug Gangsters do.
                      </font>
                    </span>
                    <br></br>
                    <div>
                      <span class="title" align="right">
                        <font color="white">
                          <b>
                            <i>Eat, Fuck & Farm like a Gangster</i>
                          </b>
                        </font>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br></br>
            <div
              class="page-content"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div class="container pg">
                <div class="farms-list-wrapper">
                  {/* EWT-PUG FARM */}
                  <div class="balance" align="left">
                    <span class="label">
                      <font color="white">WALLET BALANCE:</font>
                    </span>
                    <span class="value">
                      <font color="white">
                        {this.state.ewt_clp_wallet_balance}
                      </font>
                    </span>
                  </div>

                  <div class="section staked">
                    <div class="wrapper_important_pairs">
                      <main role="main" className="farm-list">
                        <div class="row">
                          <div class="farms-card-item clickable">
                            <div class="icon">
                              <div
                                class="card-icon no-select"
                                style={{ height: "90px", width: "90px" }}
                              >
                                <img src={pugEwtt} alt="icon" />
                              </div>
                            </div>
                            <div></div>
                            <div class="label" align="right">
                              <span>
                                $<font color="white">PUG-EWT</font>
                              </span>
                            </div>
                            <div class="rates">
                              <span class="apy">
                                {this.state.reward_ewt_pdt_ammo == 0
                                  ? "$AMMO"
                                  : `$${this.state.reward_ewt_pdt_ammo}`}
                              </span>
                              <span class="description">
                                {this.state.reward_ewt_pdt_ammo == 0
                                  ? "Earn"
                                  : `$AMMO`}
                              </span>
                            </div>
                            <div class="details return" align="right">
                              <div
                                class="bunny-button clickable no-select"
                                onClick={(e) => this.withdraw_ewt_clp(e)}
                              >
                                <div class="content">
                                  <font
                                    color={
                                      this.state.depo_clp_ewt_amount != 0
                                        ? "white"
                                        : "gray"
                                    }
                                  >
                                    WITHDRAW
                                  </font>
                                  <div class="subtext"></div>
                                </div>
                              </div>
                            </div>
                            <div class="details total" align="right">
                              <span class="label">Deposited:</span>
                              <span class="value">
                                {this.state.depo_clp_ewt_amount} EWT-PUG
                              </span>
                            </div>
                          </div>
                        </div>
                        <br></br>
                      </main>

                      {/* Operating BOX */}
                      <div
                        class="token-input"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          class="token-input-wrapper"
                          style={{ width: "55%" }}
                        >
                          <input
                            class="token-input"
                            placeholder={
                              this.state.input_lp_ewt == 0
                                ? "0.0"
                                : this.state.input_lp_ewt
                            }
                            onChange={this.ChangeCLP_EWT_Amount}
                          />
                          <span class="token-input-symbol no-select">
                            PUG-EWT CLP
                          </span>
                          <div
                            class="token-input-max clickable"
                            onClick={(e) => this.ChangeCLP_EWT_Amount(e)}
                          >
                            MAX
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="farm-detail-control-action-wrapper"
                      style={{ height: "5px" }}
                    >
                      <div class="row">
                        <div
                          class="bunny-button clickable no-select"
                          onClick={(e) =>
                            this.deposit_ewt_clp(this.state.input_lp_ewt)
                          }
                        >
                          <div class="content">
                            <font color="white">DEPOSIT</font>
                            <div class="subtext"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* PUG AMMO */}
                    <main role="main" className="farm-list">
                      <div class="balance" align="left">
                        <span class="label">
                          <font color="white">WALLET BALANCE:</font>
                        </span>
                        <span class="value">
                          <font color="white">
                            {this.state.ammo_clp_wallet_balance}
                          </font>
                        </span>
                      </div>

                      <div class="row">
                        <div class="farms-card-item">
                          <div class="icon">
                            <div
                              class="card-icon no-select"
                              style={{ height: "90px", width: "90px" }}
                            >
                              <img src={pugAmmo} alt="icon" />
                            </div>
                          </div>
                          <div></div>
                          <div class="label" align="right">
                            <span>
                              $<font color="white">PUG-AMMO</font>
                            </span>
                          </div>
                          <div class="rates">
                            <span class="apy">
                              {this.state.reward_ammo_pdt_ammo == 0
                                ? "$AMMO"
                                : `$${this.state.reward_ammo_pdt_ammo}`}
                            </span>
                            <span class="description">
                              {this.state.reward_ammo_pdt_ammo == 0
                                ? "Earn"
                                : `$AMMO`}
                            </span>
                          </div>
                          <div class="details return" align="right">
                            <div
                              class="bunny-button clickable no-select"
                              onClick={(e) => this.withdraw_ammo_clp(e)}
                            >
                              <div class="content">
                                <font
                                  color={
                                    this.state.depo_clp_ammo_amount != 0
                                      ? "white"
                                      : "gray"
                                  }
                                >
                                  WITHDRAW
                                </font>
                                <div class="subtext"></div>
                              </div>
                            </div>
                          </div>
                          <div class="details total" align="right">
                            <span class="label">Deposited:</span>
                            <span class="value">
                              {this.state.depo_clp_ammo_amount} AMMO-PUG
                            </span>
                          </div>
                        </div>
                      </div>
                      <br></br>
                    </main>
                    {/* Operating BOX */}
                    <div
                      class="token-input"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div class="token-input-wrapper" style={{ width: "55%" }}>
                        <input
                          class="token-input"
                          placeholder={
                            this.state.input_lp_ammo == 0
                              ? "0.0"
                              : this.state.input_lp_ammo
                          }
                          onChange={this.ChangeCLP_AMMO_Amount}
                        />
                        <span class="token-input-symbol no-select">
                          PUG-AMMO CLP
                        </span>
                        <div
                          class="token-input-max clickable"
                          onClick={(e) => this.ChangeCLP_AMMO_Amount(e)}
                        >
                          MAX
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="card-content">
                    <div class="farm-detail-control-action-wrapper">
                      <div class="row">
                        <div
                          class="bunny-button clickable no-select"
                          onClick={(e) =>
                            this.deposit_ammo_clp(this.state.input_lp_ammo)
                          }
                        >
                          <div class="content">
                            <font color="white">DEPOSIT</font>
                            <div class="subtext"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* USDC-PUG FARM */}

                <main role="main" className="farm-list">
                  <div class="balance" align="left">
                    <span class="label">
                      <font color="white">WALLET BALANCE:</font>
                    </span>
                    <span class="value">
                      <font color="white">
                        {this.state.ammo_clp_wallet_balance}
                      </font>
                    </span>
                  </div>

                  <div class="row">
                    <div class="farms-card-item">
                      <div class="icon">
                        <div
                          class="card-icon no-select"
                          style={{ height: "90px", width: "90px" }}
                        >
                          <img src={pugUsdc} alt="icon" />
                        </div>
                      </div>
                      <div></div>
                      <div class="label" align="right">
                        <span>$PUG-USDC</span>
                      </div>
                      <div class="rates">
                        <span class="apy">
                          {this.state.reward_ammo_pdt_ammo == 0
                            ? "$AMMO"
                            : `$${this.state.reward_ammo_pdt_ammo}`}
                        </span>
                        <span class="description">
                          {this.state.reward_ammo_pdt_ammo == 0
                            ? "Earn"
                            : `$AMMO`}
                        </span>
                      </div>
                      <div class="details return" align="right">
                        <div
                          class="bunny-button clickable no-select"
                          onClick={(e) => this.withdraw_ammo_clp(e)}
                        >
                          <div class="content">
                            <font
                              color={
                                this.state.depo_clp_ammo_amount != 0
                                  ? "white"
                                  : "gray"
                              }
                            >
                              WITHDRAW
                            </font>
                            <div class="subtext"></div>
                          </div>
                        </div>
                      </div>
                      <div class="details total" align="right">
                        <span class="label">Deposited:</span>
                        <span class="value">
                          {this.state.depo_clp_ammo_amount} USDC-PUG
                        </span>
                      </div>
                    </div>
                  </div>
                  <br></br>
                </main>
                {/* Operating BOX */}
                <div
                  class="token-input"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div class="token-input-wrapper" style={{ width: "75%" }}>
                    <input
                      class="token-input"
                      placeholder={
                        this.state.input_lp_ammo == 0
                          ? "0.0"
                          : this.state.input_lp_ammo
                      }
                      onChange={this.ChangeCLP_AMMO_Amount}
                    />
                    <span class="token-input-symbol no-select">
                      PUG-USDC CLP
                    </span>
                    <div
                      class="token-input-max clickable"
                      onClick={(e) => this.ChangeCLP_AMMO_Amount(e)}
                    >
                      MAX
                    </div>
                  </div>
                </div>
              </div>

              <div class="card-content">
                <div
                  class="farm-detail-control-action-wrapper"
                  align="center"
                  style={{ height: "5px" }}
                >
                  <div class="row">
                    <div
                      class="bunny-button clickable no-select"
                      onClick={(e) =>
                        this.deposit_ammo_clp(this.state.input_lp_ammo)
                      }
                    >
                      <div class="content" align="center">
                        <font color="white">DEPOSIT</font>
                        <div class="subtext"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* WBNB-PUG FARM */}

            <main role="main" className="farm-list">
              <div class="balance" align="left">
                <span class="label">
                  <font color="white">WALLET BALANCE:</font>
                </span>
                <span class="value">
                  <font color="white">
                    {this.state.ammo_clp_wallet_balance}
                  </font>
                </span>
              </div>

              <div class="row">
                <div class="farms-card-item">
                  <div class="icon">
                    <div
                      class="card-icon no-select"
                      style={{ height: "90px", width: "90px" }}
                    >
                      <img src={pugBnb} alt="icon" />
                    </div>
                  </div>
                  <div></div>
                  <div class="label" align="right">
                    <span>$PUG-BNB</span>
                  </div>
                  <div class="rates">
                    <span class="apy">
                      {this.state.reward_ammo_pdt_ammo == 0
                        ? "$AMMO"
                        : `$${this.state.reward_ammo_pdt_ammo}`}
                    </span>
                    <span class="description">
                      {this.state.reward_ammo_pdt_ammo == 0 ? "Earn" : `$AMMO`}
                    </span>
                  </div>
                  <div class="details return" align="right">
                    <div
                      class="bunny-button clickable no-select"
                      onClick={(e) => this.withdraw_ammo_clp(e)}
                    >
                      <div class="content">
                        <font
                          color={
                            this.state.depo_clp_ammo_amount != 0
                              ? "white"
                              : "gray"
                          }
                        >
                          WITHDRAW
                        </font>
                        <div class="subtext"></div>
                      </div>
                    </div>
                  </div>
                  <div class="details total" align="right">
                    <span class="label">Deposited:</span>
                    <span class="value">
                      {this.state.depo_clp_ammo_amount} BNB-PUG
                    </span>
                  </div>
                </div>
              </div>
              <br></br>
            </main>
            {/* Operating BOX */}
            <div
              class="token-input"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div class="token-input-wrapper" style={{ width: "75%" }}>
                <input
                  class="token-input"
                  placeholder={
                    this.state.input_lp_ammo == 0
                      ? "0.0"
                      : this.state.input_lp_ammo
                  }
                  onChange={this.ChangeCLP_AMMO_Amount}
                />
                <span class="token-input-symbol no-select">PUG-BNB CLP</span>
                <div
                  class="token-input-max clickable"
                  onClick={(e) => this.ChangeCLP_AMMO_Amount(e)}
                >
                  MAX
                </div>
              </div>
            </div>

            <div class="card-content">
              <div
                class="farm-detail-control-action-wrapper"
                align="center"
                style={{ height: "5px" }}
              >
                <div class="row">
                  <div
                    class="bunny-button clickable no-select"
                    onClick={(e) =>
                      this.deposit_ammo_clp(this.state.input_lp_ammo)
                    }
                  >
                    <div class="content" align="center">
                      <font color="white">DEPOSIT</font>
                      <div class="subtext"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* WBNB-PUG FARM */}

            <main role="main" className="farm-list">
              <div class="balance" align="left">
                <span class="label">
                  <font color="white">WALLET BALANCE:</font>
                </span>
                <span class="value">
                  <font color="white">
                    {this.state.ammo_clp_wallet_balance}
                  </font>
                </span>
              </div>

              <div class="row">
                <div class="farms-card-item">
                  <div class="icon">
                    <div
                      class="card-icon no-select"
                      style={{ height: "90px", width: "90px" }}
                    >
                      <img src={pugSusu} alt="icon" />
                    </div>
                  </div>
                  <div></div>
                  <div class="label" align="right">
                    <span>$PUG-SUSU</span>
                  </div>
                  <div class="rates">
                    <span class="apy">
                      {this.state.reward_ammo_pdt_ammo == 0
                        ? "$AMMO"
                        : `$${this.state.reward_ammo_pdt_ammo}`}
                    </span>
                    <span class="description">
                      {this.state.reward_ammo_pdt_ammo == 0 ? "Earn" : `$AMMO`}
                    </span>
                  </div>
                  <div class="details return" align="right">
                    <div
                      class="bunny-button clickable no-select"
                      onClick={(e) => this.withdraw_ammo_clp(e)}
                    >
                      <div class="content">
                        <font
                          color={
                            this.state.depo_clp_ammo_amount != 0
                              ? "white"
                              : "gray"
                          }
                        >
                          WITHDRAW
                        </font>
                        <div class="subtext"></div>
                      </div>
                    </div>
                  </div>
                  <div class="details total" align="right">
                    <span class="label">Deposited:</span>
                    <span class="value">
                      {this.state.depo_clp_ammo_amount} SUSU-PUG
                    </span>
                  </div>
                </div>
              </div>
              <br></br>
            </main>
            {/* Operating BOX */}
            <div
              class="token-input"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div class="token-input-wrapper" style={{ width: "75%" }}>
                <input
                  class="token-input"
                  placeholder={
                    this.state.input_lp_ammo == 0
                      ? "0.0"
                      : this.state.input_lp_ammo
                  }
                  onChange={this.ChangeCLP_AMMO_Amount}
                />
                <span class="token-input-symbol no-select">PUG-SUSU CLP</span>
                <div
                  class="token-input-max clickable"
                  onClick={(e) => this.ChangeCLP_AMMO_Amount(e)}
                >
                  MAX
                </div>
              </div>
            </div>

            <div class="card-content">
              <div
                class="farm-detail-control-action-wrapper"
                align="center"
                style={{ height: "5px" }}
              >
                <div class="row">
                  <div
                    class="bunny-button clickable no-select"
                    onClick={(e) =>
                      this.deposit_ammo_clp(this.state.input_lp_ammo)
                    }
                  >
                    <div class="content" align="center">
                      <font color="white">DEPOSIT</font>
                      <div class="subtext"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <br></br>

            <br></br>

            <br></br>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
