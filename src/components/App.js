import { Tabs, Tab } from "react-bootstrap";
import React, { Component } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
// import  Routes from './routes';

import Web3 from "web3";
import Countdown from "react-countdown";

import "./App.css";
// import EwtFarm from './ewtFarm.js';

//!FAKE -- delete!
import Ewt_Fake from "../abis/Ewt_lp.json";
import Ammo_Fake from "../abis/Ammo_lp.json";
import Clp2 from "../abis/CLP_2.json";
import Clp3 from "../abis/CLP_3.json";
import Clp4 from "../abis/CLP_4.json";
//!end : FAKE -- delete!

import PugMasterChef from "../abis/PMasterChef.json";
import Token from "../abis/SusuToken.json";
//TODO: Implement
import GMasterChef from "../abis/GMasterChef.json";
import GS from "../abis/GSToken.json";

import pugSusu from "./assets/pugSusu.png";
import pugEwtt from "./assets/pugEwtt.png";
import pugAmmo from "./assets/pugAmmo.png";
import ammoUsdc from "./assets/ammoUsdc.png";
import pugUsdc from "./assets/pugUsdc.png";
import pugBnb from "./assets/pugBnb.png";
import gngLotto from "./assets/gngLotto.png";

const farm_opening = new Date(2021, 6, 5, 19, 0, 0, 0);

const gs_pair_0 = "AMMO-USDC";
const pair_0 = "PUG-EWT";
const pair_1 = "PUG-SUSU";
const pair_3 = "PUG-USDC";
const pair_4 = "PUG-BNB";
const pug_ewt_contract_address = "0xc61500fa1bfa61312c71393a202149bac9ce1de4";
const ammo_usdc_contract_address = "0x20ae3646e74dfec646b2788286065f642245ca5f";
const pug_susu_contract_address = "0x6a6a9a7215b402771d2a35866a2c445cdc2a4019";
const pug_usdc_contract_address = "0xdc3323a7cd9bd55660f6a461cd14f91c2668de27";
const pug_bnb_contract_address = "0x9bdb88dff2d0639d4824512152794114f557d411";
const GS_Block = 0.001074735449735;
const gsPrice = 1;
const AMMO_per_Block = 5.642364376368273;
const EWT_Block_Time = 5.8;
const EWT_Blocks_Day = (60 * 60 * 24) / EWT_Block_Time;
const days_year = 365;
const ttl_gs = 2;
const ammo_usdc_allo = 2;

const ttl_pugs_allo = 7;
const pug_ewt_allo = 3;
const pug_susu_allo = 2;
const pug_usdc_allo = 1;
const pug_bnb_allo = 1;

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

class Home extends Component {
  async componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch);
    //* G$ Rewards Reload
    this.AmmoUsdcRewardDisplay().then(() => {
      const ammo_usdc_interval = setInterval(
        () => this.AmmoUsdcRewardDisplay(),
        10 * 1000
      );
      this.ammo_usdc_interval = ammo_usdc_interval;
    });

    //* $AMMO Rewards Reload
    this.PugEwtRewardDisplay().then(() => {
      const pug_ewt_interval = setInterval(
        () => this.PugEwtRewardDisplay(),
        10 * 1000
      );
      this.pug_ewt_interval = pug_ewt_interval;
    });
    this.PugSusuRewardDisplay().then(() => {
      const pug_susu_interval = setInterval(
        () => this.PugSusuRewardDisplay(),
        10 * 1000
      );
      this.pug_susu_interval = pug_susu_interval;
    });
    this.PugUsdcRewardDisplay().then(() => {
      const pug_usdc_interval = setInterval(
        () => this.PugUsdcRewardDisplay(),
        10 * 1000
      );
      this.pug_usdc_interval = pug_usdc_interval;
    });
    this.PugBnbRewardDisplay().then(() => {
      const pug_bnb_interval = setInterval(
        () => this.PugBnbRewardDisplay(),
        10 * 1000
      );
      this.pug_bnb_interval = pug_bnb_interval;
    });

    //*Interval ends
  }

  componentWillUnmount() {
    clearInterval(this.ammo_usdc_interval);
    clearInterval(this.pug_ewt_interval);
    clearInterval(this.pug_susu_interval);
    clearInterval(this.pug_usdc_interval);
    clearInterval(this.pug_bnb_interval);
    // this._isMounted = false;  <----- tried
  }

  async loadBlockchainData(dispatch) {
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      const netId = await web3.eth.net.getId();
      const blockAc = await web3.eth.getBlockNumber();

      console.log(`Gangster you are connected through NET: ${netId}`);
      console.log(`Actual Block: ${blockAc}`);
      const accounts = await web3.eth.getAccounts();
      console.log("Currently Connected to G$wap with address:");
      console.log(accounts[0]);

      //load ewt_balance
      if (typeof accounts[0] !== "undefined") {
        const ewt_balance = await web3.eth.getBalance(accounts[0]);
        this.setState({
          account: accounts[0],
          ewt_balance: web3.utils.fromWei(ewt_balance),
          web3: web3,
        });
      } else {
        window.alert("Please login with MetaMask");
      }

      //load contracts
      try {
        const ammoContract = new web3.eth.Contract(
          Token.abi,
          Token.networks[netId].address
        );

        //TODO: AQUI
        const gsContract = new web3.eth.Contract(
          GS.abi,
          GS.networks[netId].address
        );

        // //! APYsss G$
        const totalSupply = await gsContract.methods.totalSupply().call();
        const gs_supply_apy =
          (100 * ((GS_Block / totalSupply) * (GS_Block * EWT_Blocks_Day) + 1)) ^
          (days_year - 1 - 1); //!  G$ SUPPLY APY

        const ammo_totalSupply = await ammoContract.methods
          .totalSupply()
          .call();
        const ammo_supply_apy =
          (100 *
            ((AMMO_per_Block / ammo_totalSupply) *
              (AMMO_per_Block * EWT_Blocks_Day) +
              1)) ^
          (days_year - 1 - 1); //!  G$ SUPPLY APY
        let pug_ewt_apy = (ammo_supply_apy * pug_ewt_allo) / ttl_pugs_allo;
        let pug_susu_apy = (ammo_supply_apy * pug_susu_allo) / ttl_pugs_allo;
        let pug_usdc_apy = (ammo_supply_apy * pug_usdc_allo) / ttl_pugs_allo;
        let pug_bnb_apy = (ammo_supply_apy * pug_bnb_allo) / ttl_pugs_allo;

        pug_ewt_apy = (+pug_ewt_apy).toFixed(2);

        pug_susu_apy = (+pug_susu_apy).toFixed(2);

        pug_usdc_apy = (+pug_usdc_apy).toFixed(2);

        pug_bnb_apy = (+pug_bnb_apy).toFixed(2);

        this.setState({
          gs_supply_apy: gs_supply_apy,
          pug_ewt_apy: pug_ewt_apy,
          pug_susu_apy: pug_susu_apy,
          pug_usdc_apy: pug_usdc_apy,
          pug_bnb_apy: pug_bnb_apy,
        });

        //TODO: AQUI
        const ammo_usdc_contract = new web3.eth.Contract(
          tokenABI,
          ammo_usdc_contract_address
        );
        const ammo_usdc_clp = await ammo_usdc_contract.methods
          .balanceOf(accounts[0])
          .call();
        const ammo_usdc_clp_wallet_balance = web3.utils.fromWei(ammo_usdc_clp);

        const pug_ewt_contract = new web3.eth.Contract(
          tokenABI,
          pug_ewt_contract_address
        );
        const pug_ewt_clp = await pug_ewt_contract.methods
          .balanceOf(accounts[0])
          .call();
        const pug_ewt_clp_wallet_balance = web3.utils.fromWei(pug_ewt_clp);

        const pug_susu_contract = new web3.eth.Contract(
          tokenABI,
          pug_susu_contract_address
        );
        const pug_susu_clp = await pug_susu_contract.methods
          .balanceOf(accounts[0])
          .call();
        const pug_susu_clp_wallet_balance = web3.utils.fromWei(pug_susu_clp);

        const pug_usdc_contract = new web3.eth.Contract(
          tokenABI,
          pug_usdc_contract_address
        );
        const pug_usdc_clp = await pug_usdc_contract.methods
          .balanceOf(accounts[0])
          .call();
        const pug_usdc_clp_wallet_balance = web3.utils.fromWei(pug_usdc_clp);

        const pug_bnb_contract = new web3.eth.Contract(
          tokenABI,
          pug_bnb_contract_address
        );
        const pug_bnb_clp = await pug_bnb_contract.methods
          .balanceOf(accounts[0])
          .call();
        const pug_bnb_clp_wallet_balance = web3.utils.fromWei(pug_bnb_clp);

        const pMasterChef = new web3.eth.Contract(
          PugMasterChef.abi,
          PugMasterChef.networks[netId].address
        );
        const ammo_wallet_wei = await ammoContract.methods
          .balanceOf(this.state.account)
          .call();

        const ammoAddress = Token.networks[netId].address;
        const ammo_wallet_balance = web3.utils.fromWei(ammo_wallet_wei);
        const ammoFeeAddress = await pMasterChef.methods.getFeeAddress().call();

        let user_farm_0 = await pMasterChef.methods
          .userInfo(0, this.state.account)
          .call();
        let user_farm_1 = await pMasterChef.methods
          .userInfo(1, this.state.account)
          .call();
        let user_farm_2 = await pMasterChef.methods
          .userInfo(2, this.state.account)
          .call();
        let user_farm_3 = await pMasterChef.methods
          .userInfo(3, this.state.account)
          .call();

        let pdt_rewards_0 = await pMasterChef.methods
          .pendingSushi(0, this.state.account)
          .call();
        let pdt_rewards_1 = await pMasterChef.methods
          .pendingSushi(1, this.state.account)
          .call();
        let pdt_rewards_2 = await pMasterChef.methods
          .pendingSushi(2, this.state.account)
          .call();
        let pdt_rewards_3 = await pMasterChef.methods
          .pendingSushi(3, this.state.account)
          .call();

        //TODO: AQUI
        const gMasterChef = new web3.eth.Contract(
          GMasterChef.abi,
          GMasterChef.networks[netId].address
        );
        const gs_wallet_wei = await ammoContract.methods
          .balanceOf(this.state.account)
          .call();
        const gSAddress = Token.networks[netId].address;
        const gS_wallet_balance = web3.utils.fromWei(gs_wallet_wei);
        //TODO: AQUI
        const gSFeeAddress = await gMasterChef.methods.getFeeAddress().call();

        let user_gs_farm_0 = await gMasterChef.methods
          .userInfo(0, this.state.account)
          .call();
        let pdt_gs_rewards_0 = await gMasterChef.methods
          .pendingSushi(0, this.state.account)
          .call();

        //* Deposited on PUG
        let depo_clp_pug_ewt_amount_precision = web3.utils.fromWei(
          user_farm_0.amount
        );
        let depo_clp_pug_susu_amount_precision = web3.utils.fromWei(
          user_farm_1.amount
        );
        let depo_clp_pug_usdc_amount_precision = web3.utils.fromWei(
          user_farm_2.amount
        );
        let depo_clp_pug_bnb_amount_precision = web3.utils.fromWei(
          user_farm_3.amount
        );

        const depo_clp_pug_ewt_amount =
          (+depo_clp_pug_ewt_amount_precision).toFixed(4);
        const depo_clp_pug_susu_amount =
          (+depo_clp_pug_susu_amount_precision).toFixed(4);
        const depo_clp_pug_usdc_amount =
          (+depo_clp_pug_usdc_amount_precision).toFixed(4);
        const depo_clp_pug_bnb_amount =
          (+depo_clp_pug_bnb_amount_precision).toFixed(4);

        //* Deposited on GS

        //TODO: AQUI
        const depo_clp_ammo_usdc_amount_precision = web3.utils.fromWei(
          user_gs_farm_0.amount
        );
        const depo_clp_ammo_usdc_amount =
          (+depo_clp_ammo_usdc_amount_precision).toFixed(5);

        //* Rewards
        let containReward_0 = web3.utils.fromWei(pdt_rewards_0);
        let containReward_1 = web3.utils.fromWei(pdt_rewards_1);
        let containReward_2 = web3.utils.fromWei(pdt_rewards_2);
        let containReward_3 = web3.utils.fromWei(pdt_rewards_3);

        //TODO: AQUI
        let containGsReward_0 = web3.utils.fromWei(pdt_gs_rewards_0);

        let reward_farm_0 = (+containReward_0).toFixed(2);
        let reward_farm_1 = (+containReward_1).toFixed(2);
        let reward_farm_2 = (+containReward_2).toFixed(2);
        let reward_farm_3 = (+containReward_3).toFixed(2);

        //TODO: AQUI
        let reward_gs_farm_0 = (+containGsReward_0).toFixed(2);
        //TODO: AQUI
        reward_gs_farm_0 = reward_gs_farm_0
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        reward_farm_0 = reward_farm_0
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        reward_farm_1 = reward_farm_1
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        reward_farm_2 = reward_farm_2
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        reward_farm_3 = reward_farm_3
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        const farmContracts = [
          pug_ewt_contract,
          pug_susu_contract,
          pug_usdc_contract,
          pug_bnb_contract,
        ];

        //TODO: AQUI
        const gfarmContracts = [ammo_usdc_contract];
        this.setState({
          //! AMMO
          ammo: ammoContract,
          ammoAddress: ammoAddress,

          //TODO: AQUI
          gs: gsContract,
          gSAddress: gSAddress,
          gfarmContracts: gfarmContracts,

          //! PugMasterChef
          pMasterChef: pMasterChef,
          pmasterChefAddress: PugMasterChef.networks[netId].address,
          //TODO: AQUI
          gMasterChef: gMasterChef,
          gmasterChefAddress: GMasterChef.networks[netId].address,
          feeAddres: ammoFeeAddress,
          //TODO: AQUI
          gSfeeAddres: gSFeeAddress,
          //! All_Farms
          farmContracts: farmContracts,

          //* PUG FARMS
          //?Farm_0
          reward_pug_ewt_pdt_ammo: reward_farm_0,
          depo_clp_pug_ewt_amount: depo_clp_pug_ewt_amount,
          depo_clp_pug_ewt_amount_precision: depo_clp_pug_ewt_amount_precision,
          //?Farm_1
          reward_pug_susu_pdt_ammo: reward_farm_1,
          depo_clp_pug_susu_amount: depo_clp_pug_susu_amount,
          depo_clp_pug_susu_amount_precision:
            depo_clp_pug_susu_amount_precision,
          //?Farm_2
          reward_pug_usdc_pdt_ammo: reward_farm_2,
          depo_clp_pug_usdc_amount: depo_clp_pug_usdc_amount,
          depo_clp_pug_usdc_amount_precision:
            depo_clp_pug_usdc_amount_precision,
          //?Farm_3
          reward_pug_bnb_pdt_ammo: reward_farm_3,
          depo_clp_pug_bnb_amount_precision: depo_clp_pug_bnb_amount_precision,

          //TODO: AQUI
          // //* GS FARMS
          reward_ammo_usdc_pdt_gs: reward_gs_farm_0,
          depo_clp_ammo_usdc_amount: depo_clp_ammo_usdc_amount,
          depo_clp_ammo_usdc_amount_precision:
            depo_clp_ammo_usdc_amount_precision,

          //? User Globals
          pug_ewt_clp_wallet_balance: pug_ewt_clp_wallet_balance,
          pug_susu_clp_wallet_balance: pug_susu_clp_wallet_balance,
          //TODO: AQUI
          ammo_usdc_clp_wallet_balance: ammo_usdc_clp_wallet_balance,
          pug_usdc_clp_wallet_balance: pug_usdc_clp_wallet_balance,
          pug_bnb_clp_wallet_balance: pug_bnb_clp_wallet_balance,
          ammo_wallet_balance: ammo_wallet_balance,
          //TODO: AQUI
          gs_wallet_balance: gS_wallet_balance,

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

  //! REWARDS IN FARMS (G$)

  async AmmoUsdcRewardDisplay() {
    //TODO: This is my own implementation of FARMING MODE
    // if (this.state.farmMode == true) {

    try {
      console.log("AMMO-USDC REFRESH");
      const pdt_rewards_0 = await this.state.gMasterChef.methods
        .pendingSushi(0, this.state.account)
        .call();
      const containGsReward_0 = this.state.web3.utils.fromWei(pdt_rewards_0);
      const reward_ammo_usdc_pdt_gs_precision =
        this.state.web3.utils.fromWei(pdt_rewards_0);
      let reward_farm_0 = (+containGsReward_0).toFixed(5);
      reward_farm_0 = reward_farm_0
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      this.setState({
        reward_ammo_usdc_pdt_gs: reward_farm_0,
        reward_ammo_usdc_pdt_gs_precision: reward_ammo_usdc_pdt_gs_precision,
      });
    } catch (e) {
      console.log(e);
    }
    // } else {

    // }
  }

  //! REWARDS IN FARMS ($AMMO)
  async PugEwtRewardDisplay() {
    //TODO: This is my own implementation of FARMING MODE
    // if (this.state.farmMode == true) {
    try {
      console.log("trying");
      const pdt_rewards_0 = await this.state.pMasterChef.methods
        .pendingSushi(0, this.state.account)
        .call();
      const containReward_0 = this.state.web3.utils.fromWei(pdt_rewards_0);
      let reward_farm_0 = (+containReward_0).toFixed(2);
      reward_farm_0 = reward_farm_0
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      this.setState({
        reward_pug_ewt_pdt_ammo: reward_farm_0,
      });
    } catch (e) {
      console.log(e);
    }
    // } else {

    // }
  }

  async PugSusuRewardDisplay() {
    //TODO: This is my own implementation of FARMING MODE
    // if (this.state.farmMode == true) {
    try {
      console.log("trying");
      const pdt_rewards_1 = await this.state.pMasterChef.methods
        .pendingSushi(1, this.state.account)
        .call();
      const containReward_1 = this.state.web3.utils.fromWei(pdt_rewards_1);
      let reward_farm_1 = (+containReward_1).toFixed(2);
      reward_farm_1 = reward_farm_1
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      this.setState({
        reward_pug_susu_pdt_ammo: reward_farm_1,
      });
    } catch (e) {
      console.log(e);
    }
    // } else {

    // }
  }

  async PugUsdcRewardDisplay() {
    //TODO: This is my own implementation of FARMING MODE
    // if (this.state.farmMode == true) {
    try {
      console.log("trying");
      const pdt_rewards_2 = await this.state.pMasterChef.methods
        .pendingSushi(2, this.state.account)
        .call();
      const containReward_2 = this.state.web3.utils.fromWei(pdt_rewards_2);
      let reward_farm_2 = (+containReward_2).toFixed(2);
      reward_farm_2 = reward_farm_2
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      this.setState({
        reward_pug_usdc_pdt_ammo: reward_farm_2,
      });
    } catch (e) {
      console.log(e);
    }
    // } else {

    // }
  }

  async PugBnbRewardDisplay() {
    //TODO: This is my own implementation of FARMING MODE
    // if (this.state.farmMode == true) {
    try {
      console.log("trying");
      const pdt_rewards_3 = await this.state.pMasterChef.methods
        .pendingSushi(3, this.state.account)
        .call();
      const containReward_3 = this.state.web3.utils.fromWei(pdt_rewards_3);
      let reward_farm_3 = (+containReward_3).toFixed(2);
      reward_farm_3 = reward_farm_3
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      this.setState({
        reward_pug_bnb_pdt_ammo: reward_farm_3,
      });
    } catch (e) {
      console.log(e);
    }
    // } else {

    // }
  }

  //! DEPOSIT IN FARMS (G$)
  async deposit_ammo_usdc_clp(amount) {
    if (amount != 0) {
      const user_gs_farm_0 = await this.state.gfarmContracts[0].methods
        .balanceOf(this.state.account)
        .call();
      const gas = new this.state.web3.utils.BN("1000000");
      const gasPrice = new this.state.web3.utils.BN("2");

      const dep_amount = this.state.web3.utils.toWei(amount);

      const deposit = new this.state.web3.utils.BN(dep_amount);
      const allow = dep_amount;
      const fee = new this.state.web3.utils.BN("5000000000000000000");

      if (this.state.GMasterChef !== "undefined") {
        try {
          const gFeeAddress = await this.state.gMasterChef.methods
            .getFeeAddress()
            .call();
          const allowed = await this.state.gfarmContracts[0].methods
            .approve(this.state.gmasterChefAddress, allow)
            .send({
              from: this.state.account,
            });

          //TODO: 2
          //* Fee GS
          await this.state.gs.methods.transfer(gFeeAddress, fee).send({
            from: this.state.account,
            gas: gas,
            gasPrice: gasPrice,
          });

          await this.state.gMasterChef.methods.deposit(0, deposit).send({
            from: this.state.account,
            gas: gas,
            gasPrice: gasPrice,
          });
          window.location.reload();
        } catch (e) {
          console.log("Error, deposit: ", e);
        }
      }
    } else {
    }
  }

  //! DEPOSIT IN FARMS (PUG)
  async deposit_pug_ewt_clp(amount) {
    if (amount != 0) {
      const user_farm_0 = await this.state.farmContracts[0].methods
        .balanceOf(this.state.account)
        .call();
      const gas = new this.state.web3.utils.BN("1000000");
      const gasPrice = new this.state.web3.utils.BN("20000");

      const dep_amount = this.state.web3.utils.toWei(amount);

      const deposit = new this.state.web3.utils.BN(dep_amount);
      const allow = dep_amount;

      const fee = new this.state.web3.utils.BN("5000000000000000000");
      if (this.state.pMasterChef !== "undefined") {
        try {
          const gFeeAddress = await this.state.gMasterChef.methods
            .getFeeAddress()
            .call();

          const allowed = await this.state.farmContracts[0].methods
            .approve(this.state.pmasterChefAddress, allow)
            .send({ from: this.state.account });

          //TODO: 2
          //* Fee GS
          // await this.state.gs.methods.transfer(gFeeAddress, fee).send({
          //   from: this.state.account,
          //   gas: gas,
          //   gasPrice: gasPrice,
          // });

          await this.state.pMasterChef.methods.deposit(0, deposit).send({
            from: this.state.account,
            gas: gas,
            gasPrice: gasPrice,
          });
          window.location.reload();
        } catch (e) {
          console.log("Error, deposit: ", e);
        }
      }
    } else {
    }
  }

  async deposit_pug_susu_clp(amount) {
    if (amount != 0) {
      const user_farm_1 = await this.state.farmContracts[1].methods
        .balanceOf(this.state.account)
        .call();
      const gas = new this.state.web3.utils.BN("1000000");
      const gasPrice = new this.state.web3.utils.BN("20000");

      const dep_amount = this.state.web3.utils.toWei(amount);

      const deposit = new this.state.web3.utils.BN(dep_amount);
      const allow = dep_amount;
      const fee = new this.state.web3.utils.BN("5000000000000000000");

      if (this.state.pMasterChef !== "undefined") {
        try {
          const gFeeAddress = await this.state.gMasterChef.methods
            .getFeeAddress()
            .call();
          const allowed = await this.state.farmContracts[1].methods
            .approve(this.state.pmasterChefAddress, allow)
            .send({
              from: this.state.account,
            });
          //* FEE (G$)
          // await this.state.gs.methods.transfer(gFeeAddress, fee).send({
          //   from: this.state.account,
          //   gas: gas,
          //   gasPrice: gasPrice,
          // });

          await this.state.pMasterChef.methods.deposit(1, deposit).send({
            from: this.state.account,
            gas: gas,
            gasPrice: gasPrice,
          });
          window.location.reload();
        } catch (e) {
          console.log("Error, deposit: ", e);
        }
      }
    } else {
    }
  }

  async deposit_pug_usdc_clp(amount) {
    if (amount != 0) {
      const user_farm_2 = await this.state.farmContracts[2].methods
        .balanceOf(this.state.account)
        .call();
      const gas = new this.state.web3.utils.BN("1000000");
      const gasPrice = new this.state.web3.utils.BN("20000");

      const dep_amount = this.state.web3.utils.toWei(amount);

      const deposit = new this.state.web3.utils.BN(dep_amount);
      const allow = dep_amount;
      const fee = new this.state.web3.utils.BN("5000000000000000000");

      if (this.state.pMasterChef !== "undefined") {
        try {
          const gFeeAddress = await this.state.gMasterChef.methods
            .getFeeAddress()
            .call();
          const allowed = await this.state.farmContracts[2].methods
            .approve(this.state.pmasterChefAddress, allow)
            .send({
              from: this.state.account,
            });

          //* FEE (G$)
          // await this.state.gs.methods.transfer(gFeeAddress, fee).send({
          //   from: this.state.account,
          //   gas: gas,
          //   gasPrice: gasPrice,
          // });

          await this.state.pMasterChef.methods.deposit(2, deposit).send({
            from: this.state.account,
            gas: gas,
            gasPrice: gasPrice,
          });
          window.location.reload();
        } catch (e) {
          console.log("Error, deposit: ", e);
        }
      }
    } else {
    }
  }

  async deposit_pug_bnb_clp(amount) {
    if (amount != 0) {
      const user_farm_3 = await this.state.farmContracts[3].methods
        .balanceOf(this.state.account)
        .call();
      const gas = new this.state.web3.utils.BN("1000000");
      const gasPrice = new this.state.web3.utils.BN("20000");

      const dep_amount = this.state.web3.utils.toWei(amount);

      const deposit = new this.state.web3.utils.BN(dep_amount);
      const allow = dep_amount;
      const fee = new this.state.web3.utils.BN("5000000000000000000");

      if (this.state.pMasterChef !== "undefined") {
        try {
          const gFeeAddress = await this.state.gMasterChef.methods
            .getFeeAddress()
            .call();
          const allowed = await this.state.farmContracts[3].methods
            .approve(this.state.pmasterChefAddress, allow)
            .send({
              from: this.state.account,
            });

          //* FEE (G$)
          // await this.state.gs.methods.transfer(gFeeAddress, fee).send({
          //   from: this.state.account,
          //   gas: gas,
          //   gasPrice: gasPrice,
          // });

          await this.state.pMasterChef.methods.deposit(3, deposit).send({
            from: this.state.account,
            gas: gas,
            gasPrice: gasPrice,
          });
          window.location.reload();
        } catch (e) {
          console.log("Error, deposit: ", e);
        }
      }
    } else {
    }
  }

  //! END: DEPOSIT IN FARMS

  //! WITHDRAW GS  FARMS

  async withdraw_ammo_usdc_clp(e) {
    if (this.state.depo_clp_ammo_usdc_amount_precision > 0) {
      const user_farm_0_gs = await this.state.gMasterChef.methods
        .userInfo(0, this.state.account)
        .call();
      const maxAmount = this.state.web3.utils.fromWei(user_farm_0_gs.amount);
      const withdraw = new this.state.web3.utils.BN(
        this.state.web3.utils.toWei(maxAmount)
      );
      const ammoAddress = this.state.ammoAddress;
      const gas = new this.state.web3.utils.BN("1000000");
      const gasPrice = new this.state.web3.utils.BN("20000");
      const fee = new this.state.web3.utils.BN("5000000000000000000");

      const currentGSBalance = await this.state.gs.methods
        .balanceOf(this.state.account)
        .call();

      e.preventDefault();
      if (this.state.pMasterChef !== "undefined") {
        try {
          const gFeeAddress = await this.state.gMasterChef.methods
            .getFeeAddress()
            .call();

          //* FEE (G$)
          // await this.state.gs.methods.transfer(gFeeAddress, fee).send({
          //   from: this.state.account,
          //   gas: gas,
          //   gasPrice: gasPrice,
          // });

          await this.state.gMasterChef.methods
            .withdraw(0, withdraw)
            .send({ from: this.state.account });
          window.location.reload();
        } catch (e) {
          console.log("Error, withdraw: ", e);
        }
      }
    } else {
      return;
    }
  }

  //! WITHDRAW PUG FARMS

  async withdraw_pug_ewt_clp(e) {
    if (this.state.depo_clp_pug_ewt_amount_precision > 0) {
      const user_farm_0 = await this.state.pMasterChef.methods
        .userInfo(0, this.state.account)
        .call();
      const maxAmount = this.state.web3.utils.fromWei(user_farm_0.amount);
      const withdraw = new this.state.web3.utils.BN(
        this.state.web3.utils.toWei(maxAmount)
      );
      const gas = new this.state.web3.utils.BN("1000000");
      const gasPrice = new this.state.web3.utils.BN("200000");

      const ammoAddress = this.state.ammoAddress;
      const currentAmmoBalance = await this.state.ammo.methods
        .balanceOf(this.state.account)
        .call();
      const fee = new this.state.web3.utils.BN("5000000000000000000");

      e.preventDefault();
      if (this.state.pMasterChef !== "undefined") {
        try {
          const gFeeAddress = await this.state.gMasterChef.methods
            .getFeeAddress()
            .call();

          //* FEE (G$)
          // await this.state.gs.methods.transfer(gFeeAddress, fee).send({
          //   from: this.state.account,
          //   gas: gas,
          //   gasPrice: gasPrice,
          // });

          await this.state.pMasterChef.methods
            .withdraw(0, withdraw)
            .send({ from: this.state.account });

          window.location.reload();
        } catch (e) {
          console.log("Error, withdraw: ", e);
        }
      }
    } else {
      return;
    }
  }

  async withdraw_pug_susu_clp(e) {
    if (this.state.depo_clp_pug_susu_amount_precision > 0) {
      const user_farm_1 = await this.state.pMasterChef.methods
        .userInfo(1, this.state.account)
        .call();
      const maxAmount = this.state.web3.utils.fromWei(user_farm_1.amount);
      const withdraw = new this.state.web3.utils.BN(
        this.state.web3.utils.toWei(maxAmount)
      );
      const ammoAddress = this.state.ammoAddress;
      const gas = new this.state.web3.utils.BN("1000000");
      const gasPrice = new this.state.web3.utils.BN("200000");
      const fee = new this.state.web3.utils.BN("5000000000000000000");

      const currentAmmoBalance = await this.state.ammo.methods
        .balanceOf(this.state.account)
        .call();

      e.preventDefault();
      if (this.state.pMasterChef !== "undefined") {
        try {
          const gFeeAddress = await this.state.gMasterChef.methods
            .getFeeAddress()
            .call();

          //* FEE (G$)
          // await this.state.gs.methods.transfer(gFeeAddress, fee).send({
          //   from: this.state.account,
          //   gas: gas,
          //   gasPrice: gasPrice,
          // });

          await this.state.pMasterChef.methods
            .withdraw(1, withdraw)
            .send({ from: this.state.account });
          window.location.reload();
        } catch (e) {
          console.log("Error, withdraw: ", e);
        }
      }
    } else {
      return;
    }
  }

  async withdraw_pug_usdc_clp(e) {
    if (this.state.depo_clp_pug_usdc_amount_precision > 0) {
      const user_farm_2 = await this.state.pMasterChef.methods
        .userInfo(2, this.state.account)
        .call();
      const maxAmount = this.state.web3.utils.fromWei(user_farm_2.amount);
      const withdraw = new this.state.web3.utils.BN(
        this.state.web3.utils.toWei(maxAmount)
      );
      const ammoAddress = this.state.ammoAddress;
      const gas = new this.state.web3.utils.BN("1000000");
      const gasPrice = new this.state.web3.utils.BN("200000");
      const fee = new this.state.web3.utils.BN("5000000000000000000");

      const currentAmmoBalance = await this.state.ammo.methods
        .balanceOf(this.state.account)
        .call();

      e.preventDefault();
      if (this.state.pMasterChef !== "undefined") {
        try {
          const gFeeAddress = await this.state.gMasterChef.methods
            .getFeeAddress()
            .call();

          //* FEE (G$)
          // await this.state.gs.methods.transfer(gFeeAddress, fee).send({
          //   from: this.state.account,
          //   gas: gas,
          //   gasPrice: gasPrice,
          // });

          await this.state.pMasterChef.methods
            .withdraw(2, withdraw)
            .send({ from: this.state.account });
          window.location.reload();
        } catch (e) {
          console.log("Error, withdraw: ", e);
        }
      }
    } else {
      return;
    }
  }

  async withdraw_pug_bnb_clp(e) {
    if (this.state.depo_clp_pug_bnb_amount_precision > 0) {
      const user_farm_3 = await this.state.pMasterChef.methods
        .userInfo(3, this.state.account)
        .call();
      const maxAmount = this.state.web3.utils.fromWei(user_farm_3.amount);
      const withdraw = new this.state.web3.utils.BN(
        this.state.web3.utils.toWei(maxAmount)
      );
      const ammoAddress = this.state.ammoAddress;
      const gas = new this.state.web3.utils.BN("1000000");
      const gasPrice = new this.state.web3.utils.BN("200000");
      const fee = new this.state.web3.utils.BN("5000000000000000000");

      const currentAmmoBalance = await this.state.ammo.methods
        .balanceOf(this.state.account)
        .call();

      e.preventDefault();
      if (this.state.pMasterChef !== "undefined") {
        try {
          const gFeeAddress = await this.state.gMasterChef.methods
            .getFeeAddress()
            .call();

          //* FEE (G$)
          // await this.state.gs.methods.transfer(gFeeAddress, fee).send({
          //   from: this.state.account,
          //   gas: gas,
          //   gasPrice: gasPrice,
          // });

          await this.state.pMasterChef.methods
            .withdraw(3, withdraw)
            .send({ from: this.state.account });
          window.location.reload();
        } catch (e) {
          console.log("Error, withdraw: ", e);
        }
      }
    } else {
      return;
    }
  }

  //! END: WITHDRAW IN FARMS

  constructor(props) {
    super(props);
    this.state = {
      //*Globals
      web3: "undefined",
      pMasterChef: null,
      netId: null,
      ammoFeeAddress: null,
      //TODO: AQUI
      gFeeAddress: null,
      //?UserGlobals
      account: "",
      ewt_balance: 0,
      //!Balances

      //* AMMO_USDC
      //TODO: AQUI
      ammo_usdc_clp_wallet_balance: 0,
      reward_ammo_usdc_pdt_gs: 0.0,
      reward_ammo_usdc_pdt_gs_precision: 0.0,
      depo_clp_ammo_usdc_amount: 0,
      input_lp_ammo_usdc: 0,

      //* PUG_EWT
      pug_ewt_clp_wallet_balance: 0,
      reward_pug_ewt_pdt_ammo: 0.0,
      depo_clp_pug_ewt_amount: 0,
      input_lp_pug_ewt: 0,

      //* PUG_SUSU
      pug_susu_clp_wallet_balance: 0,
      reward_pug_susu_pdt_ammo: 0.0,
      depo_clp_ammo_usdc_amount: 0,
      input_lp_pug_susu: 0,

      //* PUG_USDC
      pug_usdc_clp_wallet_balance: 0,
      reward_pug_usdc_pdt_ammo: 0.0,
      depo_clp_pug_usdc_amount: 0,
      input_lp_pug_usdc: 0,

      //* PUG_BNB
      pug_bnb_clp_wallet_balance: 0,
      reward_pug_bnb_pdt_ammo: 0.0,
      depo_clp_pug_bnb_amount: 0,
      input_lp_pug_bnb: 0,

      //! Contracts&Addresses
      farmContracts: [],
      //TODO: AQUI
      gfarmContracts: [],
      ammo: null,
      gs: null,
      pmasterChefAddress: null,
      //TODO: AQUI
      gmasterChefAddress: null,

      //?* State Management
      pair: null,
    };
  }

  ChangeCLP_AMMO_USDC_Amount = (event) => {
    console.log(event.target.value);
    if (event.target.value == undefined) {
      this.setState({
        input_lp_ammo_usdc: this.state.ammo_usdc_clp_wallet_balance,
      });
    } else {
      //this opens in a new tab (believe that is what the owner of the question wanted if not you can do window.location.href = "/insert/your/path/here".
      this.setState({ input_lp_ammo_usdc: event.target.value });
    }
  };

  ChangeCLP_PUG_EWT_Amount = (event) => {
    console.log(event.target.value == undefined);
    if (event.target.value == undefined) {
      this.setState({
        input_lp_pug_ewt: this.state.pug_ewt_clp_wallet_balance,
      });
    } else {
      this.setState({ input_lp_pug_ewt: event.target.value });
    }
  };

  ChangeCLP_PUG_SUSU_Amount = (event) => {
    console.log(event.target.value);
    if (event.target.value == undefined) {
      this.setState({
        input_lp_pug_susu: this.state.pug_susu_clp_wallet_balance,
      });
    } else {
      this.setState({ input_lp_pug_susu: event.target.value });
      //this opens in a new tab (believe that is what the owner of the question wanted if not you can do window.location.href = "/insert/your/path/here".
    }
  };

  ChangeCLP_PUG_USDC_Amount = (event) => {
    console.log(event.target.value);
    if (event.target.value == undefined) {
      this.setState({
        input_lp_pug_usdc: this.state.pug_usdc_clp_wallet_balance,
      });
    } else {
      this.setState({ input_lp_pug_usdc: event.target.value });
      //this opens in a new tab (believe that is what the owner of the question wanted if not you can do window.location.href = "/insert/your/path/here".
    }
  };

  ChangeCLP_PUG_BNB_Amount = (event) => {
    console.log(event.target.value);
    if (event.target.value == undefined) {
      this.setState({
        input_lp_pug_bnb: this.state.pug_bnb_clp_wallet_balance,
      });
    } else {
      this.setState({ input_lp_pug_bnb: event.target.value });
      //this opens in a new tab (believe that is what the owner of the question wanted if not you can do window.location.href = "/insert/your/path/here".
    }
  };

  //*Navigation

  //* END: Navigation

  render() {
    return (
      <div>
        <div className="root">
          <br></br>
          <div className="page" style={{ background: "black" }}>
            <br></br>
            <br></br>
            <div class="pot-banner">
              <div class="wrapper">
                <div class="banner-wrapper">
                  <div class="txt-wrapper">
                    <span class="title">
                      G<font size="+3">angster</font> F
                      <font size="+3">arming</font>
                    </span>
                    <span class="sub-title">
                      <font color="white">
                        The G$wap Farming is for those who support @mobpug
                        ($PUG) from the begining. Gangsters take care of other
                        Gangsters, at least, since I'm Pug Father, I do.
                      </font>
                    </span>
                    <br></br>
                    <div align="center">
                      <span class="title">
                        {farm_opening - Date.now() >= 0 ? (
                          <font color="ec6998">
                            <b>
                              <span class="pot-timestamp">
                                <font size="+1">Starts in: </font>
                                <font color="white" size="+1">
                                  <i>
                                    <Countdown date={farm_opening} />{" "}
                                    <font color="white" size="1">
                                      (block:12650236)
                                    </font>
                                  </i>
                                </font>
                              </span>
                            </b>
                          </font>
                        ) : (
                          <font color="ec6998">
                            <b>
                              <span class="pot-timestamp">
                                <font size="+1">
                                  Farms are ready to reward you
                                </font>
                              </span>
                            </b>
                          </font>
                        )}
                      </span>
                    </div>
                    <br></br>
                    {farm_opening - Date.now() >= 0 ? (
                      <div align="center">
                        <span class="title" size="1">
                          <font color="ec6998">
                            <b>
                              <i>
                                "You can try to Deposit and Withdraw but rewards
                                will start once the Countdown is over"
                              </i>
                            </b>
                          </font>
                        </span>
                      </div>
                    ) : (
                      <div align="center">
                        <span class="title" size="1">
                          <font color="ec6998">
                            <b>
                              <i>
                                "Every time you Deposit or Withdraw Rewards will
                                be Harvest"
                              </i>
                            </b>
                          </font>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
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
                  {/* FIRST FARM */}
                  {/* TODO: AQUI */}
                  {/* AMMO-USDC FARM GS */}

                  <main role="main" className="farm-list">
                    <div class="ewt_balance" align="left">
                      <span class="label">
                        <font color="ec6998">
                          <b>
                            WALLET <font color="white"></font> BALANCE:
                          </b>
                        </font>{" "}
                      </span>
                      {/* TODO: AQUI */}
                      <span class="value">
                        <font color="white">
                          {this.state.ammo_usdc_clp_wallet_balance}
                        </font>
                      </span>
                    </div>

                    <div class="row">
                      <div class="farms-card-item clickable boost-subimp">
                        <div class="icon">
                          <div
                            class="card-icon no-select"
                            style={{
                              height: "120px",
                              width: "120px",
                            }}
                          >
                            <img src={ammoUsdc} alt="icon" />
                          </div>
                        </div>
                        <div></div>
                        <div
                          class="label"
                          style={{
                            alignItems: "center",
                          }}
                        >
                          <span>
                            <i>$</i>
                            <font color="white">{gs_pair_0}</font>
                          </span>{" "}
                          <span>
                            <font color="white" size="1">
                              G
                            </font>
                            <font color="fe1e70" size="1">
                              <i>$wap Booster</i>
                            </font>
                          </span>
                        </div>
                        <div class="rates">
                          <span class="apy">
                            {/* TODO: REMOVE THIS AND UNCOMMENT OTHER */}

                            {/* TODO: AQUI */}

                            {this.state.reward_ammo_usdc_pdt_gs_precision <
                            0.000001 ? (
                              <font>
                                {this.state.gs_supply_apy}
                                <i>
                                  <font size="+1">%</font>
                                </i>
                              </font>
                            ) : (
                              <font>
                                <font>
                                  {this.state.reward_ammo_usdc_pdt_gs}
                                </font>{" "}
                                G
                                <i>
                                  <font size="+1">$</font>
                                </i>
                              </font>
                            )}
                          </span>
                          <span class="apr">
                            <font>
                              <font size="+1">
                                <i>APY</i>
                              </font>
                            </font>
                            {/* {this.state.reward_ammo_usdc_pdt_gs == 0 ? (
                              <font>
                                <font size="+1">
                                  <i>APY</i>
                                </font>
                              </font>
                            ) : (
                              ""
                            )} */}
                          </span>
                        </div>
                        <div class="details return" align="right">
                          <div
                            class="bunny-button clickable no-select"
                            onClick={(e) => this.withdraw_ammo_usdc_clp(e)}
                          >
                            <div class="content">
                              <font
                                color={
                                  this.state.depo_clp_ammo_usdc_amount != 0
                                    ? "white"
                                    : "gray"
                                }
                              >
                                WITHDRAW
                              </font>

                              <font size="1">
                                + G
                                <i>
                                  <font color="ec6998">$</font>
                                </i>
                              </font>
                              <div class="subfont"></div>
                            </div>
                          </div>
                        </div>
                        <div class="details" align="right">
                          {/* TODO: AQUI */}
                          <span class="label">Deposited:</span>
                          {/* <span class="label">Earn:</span> */}

                          <span class="value">
                            {this.state.depo_clp_ammo_usdc_amount} {gs_pair_0}
                            {/* <font size="+1">G</font>
                            <font size="+1" color="ec6998">
                              <i>$</i>
                            </font> */}
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
                    {/* TODO: AQUI */}

                    <div class="token-input-wrapper" style={{ width: "55%" }}>
                      <input
                        class="token-input"
                        placeholder={
                          this.state.input_lp_ammo_usdc == 0
                            ? "0.0"
                            : this.state.input_lp_ammo_usdc
                        }
                        onChange={this.ChangeCLP_AMMO_USDC_Amount}
                      />
                      <span class="token-input-symbol no-select">
                        {gs_pair_0} CLP
                      </span>
                      <div
                        class="token-input-max clickable"
                        onClick={(e) => this.ChangeCLP_AMMO_USDC_Amount(e)}
                      >
                        MAX
                      </div>
                    </div>
                  </div>
                  <br />
                  {/* TODO: AQUI */}

                  <div class="card-content">
                    <div
                      class="farm-detail-control-action-wrapper"
                      style={{ height: "5px" }}
                    >
                      <div class="row">
                        <div
                          class="bunny-button clickable no-select"
                          onClick={(e) =>
                            this.deposit_ammo_usdc_clp(
                              this.state.input_lp_ammo_usdc
                            )
                          }
                        >
                          <div class="content">
                            <font color="white">DEPOSIT</font>
                            <div class="subfont"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* EWT-PUG FARM */}
                  <div class="ewt_balance" align="left">
                    <span class="label">
                      <font color="purple">
                        <b>
                          WALLET <font color="white"></font> BALANCE:
                        </b>
                      </font>{" "}
                    </span>
                    <span class="value">
                      <font color="white">
                        {this.state.pug_ewt_clp_wallet_balance}
                      </font>
                    </span>
                  </div>

                  <div class="section staked">
                    <div class="wrapper_important_pairs">
                      <main role="main" className="farm-list">
                        <div class="row">
                          <div class="farms-card-item clickable boost undefined">
                            <div class="icon">
                              <div
                                class="card-icon no-select"
                                style={{ height: "120px", width: "120px" }}
                              >
                                <img src={pugEwtt} alt="icon" />
                              </div>
                            </div>
                            <div></div>
                            <div
                              class="label"
                              style={{
                                alignItems: "center",
                              }}
                            >
                              <span>
                                <i>$</i>
                                <font color="white">{pair_0}</font>
                              </span>{" "}
                              <span>
                                <font color="white" size="1"></font>
                                <font color="800080" size="1">
                                  <i>PUG Father Choice</i>
                                </font>
                              </span>
                            </div>
                            <div class="rates">
                              <span class="apy">
                                {this.state.reward_pug_ewt_pdt_ammo == 0 ? (
                                  <font>
                                    {this.state.pug_ewt_apy}
                                    <i>
                                      <font size="+1">%</font>
                                    </i>
                                  </font>
                                ) : (
                                  <font>
                                    <font>
                                      <i>$</i>
                                      {this.state.reward_pug_ewt_pdt_ammo}
                                    </font>
                                  </font>
                                )}
                              </span>
                              <span class="apr">
                                {this.state.reward_pug_ewt_pdt_ammo == 0 ? (
                                  <font>
                                    <font size="+1">
                                      <i>APY</i>
                                    </font>
                                  </font>
                                ) : (
                                  "AMMO"
                                )}
                              </span>
                            </div>
                            {/* Withdraw PUG-EWT */}
                            <div class="details return" align="right">
                              <div
                                class="bunny-button clickable no-select"
                                onClick={(e) => this.withdraw_pug_ewt_clp(e)}
                              >
                                <div class="content">
                                  <font
                                    color={
                                      this.state.depo_clp_pug_ewt_amount != 0
                                        ? "white"
                                        : "gray"
                                    }
                                  >
                                    WITHDRAW
                                  </font>

                                  <font size="1">
                                    + <i>$</i>AMMO
                                  </font>
                                  <div class="subfont"></div>
                                </div>
                              </div>
                            </div>
                            <div class="details total" align="right">
                              <span class="label">Deposited:</span>
                              <span class="value">
                                {this.state.depo_clp_pug_ewt_amount} EWT-PUG
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
                              this.state.input_lp_pug_ewt == 0
                                ? "0.0"
                                : this.state.input_lp_pug_ewt
                            }
                            onChange={this.ChangeCLP_PUG_EWT_Amount}
                          />
                          <span class="token-input-symbol no-select">
                            {pair_0} CLP
                          </span>
                          {/* INPUT PUG-EWT */}
                          <div
                            class="token-input-max clickable"
                            onClick={(e) => this.ChangeCLP_PUG_EWT_Amount(e)}
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
                        {/* DEPOSIT PUG-EWT */}
                        <div
                          class="bunny-button clickable no-select"
                          onClick={(e) =>
                            this.deposit_pug_ewt_clp(
                              this.state.input_lp_pug_ewt
                            )
                          }
                        >
                          <div class="content">
                            <font color="white">DEPOSIT</font>
                            <div class="subfont"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* PUG-SUSU FARM*/}
                    <main role="main" className="farm-list">
                      <div class="ewt_balance" align="left">
                        <span class="label">
                          <font color="purple">
                            <b>
                              WALLET <font color="white"></font> BALANCE:
                            </b>
                          </font>{" "}
                        </span>
                        <span class="value">
                          <font color="white">
                            {this.state.pug_susu_clp_wallet_balance}
                          </font>
                        </span>
                      </div>

                      <div class="row">
                        <div class="farms-card-item clickable boost undefined">
                          <div class="icon">
                            <div
                              class="card-icon no-select"
                              style={{ height: "120px", width: "120px" }}
                            >
                              <img src={pugSusu} alt="icon" />
                            </div>
                          </div>
                          <div></div>
                          <div class="label" align="right">
                            <span>
                              $<font color="white">{pair_1}</font>
                            </span>
                          </div>
                          <div class="rates">
                            <span class="apy">
                              {this.state.reward_pug_susu_pdt_ammo == 0 ? (
                                <font>
                                  {this.state.pug_susu_apy}
                                  <i>
                                    <font size="+1">%</font>
                                  </i>
                                </font>
                              ) : (
                                <font>
                                  <font>
                                    <i>$</i>
                                    {this.state.reward_pug_susu_pdt_ammo}
                                  </font>
                                </font>
                              )}
                            </span>
                            <span class="apr">
                              {this.state.reward_pug_susu_pdt_ammo == 0 ? (
                                <font>
                                  <font size="+1">
                                    <i>APY</i>
                                  </font>
                                </font>
                              ) : (
                                `$AMMO`
                              )}
                            </span>
                          </div>
                          <div class="details return" align="right">
                            {/* Withdraw PUG-SUSU */}
                            <div
                              class="bunny-button clickable no-select"
                              onClick={(e) => this.withdraw_pug_susu_clp(e)}
                            >
                              <div class="content">
                                <font
                                  color={
                                    this.state.depo_clp_pug_susu_amount != 0
                                      ? "white"
                                      : "gray"
                                  }
                                >
                                  WITHDRAW
                                </font>

                                <font size="1">
                                  + <i>$</i>AMMO
                                </font>
                                <div class="subfont"></div>
                              </div>
                            </div>
                          </div>
                          <div class="details total" align="right">
                            <span class="label">Deposited:</span>
                            <span class="value">
                              {this.state.depo_clp_pug_susu_amount} {pair_1}
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
                            this.state.input_lp_pug_susu == 0
                              ? "0.0"
                              : this.state.input_lp_pug_susu
                          }
                          onChange={this.ChangeCLP_PUG_SUSU_Amount}
                        />
                        <span class="token-input-symbol no-select">
                          {pair_1} CLP
                        </span>
                        {/* INPUT PUG-SUSU */}
                        <div
                          class="token-input-max clickable"
                          onClick={(e) => this.ChangeCLP_PUG_SUSU_Amount(e)}
                        >
                          MAX
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="card-content">
                    <div
                      class="farm-detail-control-action-wrapper"
                      style={{ height: "5px" }}
                    >
                      <div class="row">
                        {/* Deposit PUG-SUSU */}
                        <div
                          class="bunny-button clickable no-select"
                          onClick={(e) =>
                            this.deposit_pug_susu_clp(
                              this.state.input_lp_pug_susu
                            )
                          }
                        >
                          <div class="content">
                            <font color="white">DEPOSIT</font>
                            <div class="subfont"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* USDC-PUG FARM */}

                <main role="main" className="farm-list">
                  <div class="ewt_balance" align="left">
                    <span class="label">
                      <font color="ec6998">
                        <b>
                          WALLET <font color="white"></font> BALANCE:
                        </b>
                      </font>{" "}
                    </span>
                    <span class="value">
                      <font color="white">
                        {this.state.pug_usdc_clp_wallet_balance}
                      </font>
                    </span>
                  </div>

                  <div class="row">
                    <div class="farms-card-item">
                      <div class="icon">
                        <div
                          class="card-icon no-select"
                          style={{ height: "120px", width: "120px" }}
                        >
                          <img src={pugUsdc} alt="icon" />
                        </div>
                      </div>
                      <div></div>
                      <div class="label" align="right">
                        <span>
                          $<font color="white">{pair_3}</font>
                        </span>{" "}
                      </div>
                      <div class="rates">
                        <span class="apy">
                          {this.state.reward_pug_usdc_pdt_ammo == 0 ? (
                            <font>
                              {this.state.pug_usdc_apy}
                              <i>
                                <font size="+1">%</font>
                              </i>
                            </font>
                          ) : (
                            <font>
                              <font>
                                <i>$</i>
                                {this.state.reward_pug_usdc_pdt_ammo}
                              </font>
                            </font>
                          )}
                        </span>
                        <span class="apr">
                          {this.state.reward_pug_usdc_pdt_ammo == 0 ? (
                            <font>
                              <font size="+1">
                                <i>APY</i>
                              </font>
                            </font>
                          ) : (
                            `AMMO`
                          )}
                        </span>
                      </div>
                      <div class="details return" align="right">
                        <div
                          class="bunny-button clickable no-select"
                          onClick={(e) => this.withdraw_pug_usdc_clp(e)}
                        >
                          <div class="content">
                            <font
                              color={
                                this.state.depo_clp_pug_usdc_amount != 0
                                  ? "white"
                                  : "gray"
                              }
                            >
                              WITHDRAW
                            </font>

                            <font size="1">
                              + <i>$</i>AMMO
                            </font>
                            <div class="subfont"></div>
                          </div>
                        </div>
                      </div>
                      <div class="details total" align="right">
                        <span class="label">Deposited:</span>
                        <span class="value">
                          {this.state.depo_clp_pug_usdc_amount} {pair_3}
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
                        this.state.input_lp_pug_usdc == 0
                          ? "0.0"
                          : this.state.input_lp_pug_usdc
                      }
                      onChange={this.ChangeCLP_PUG_USDC_Amount}
                    />
                    <span class="token-input-symbol no-select">
                      {pair_3} CLP
                    </span>
                    <div
                      class="token-input-max clickable"
                      onClick={(e) => this.ChangeCLP_PUG_USDC_Amount(e)}
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
                        this.deposit_pug_usdc_clp(this.state.input_lp_pug_usdc)
                      }
                    >
                      <div class="content" align="center">
                        <font color="white">DEPOSIT</font>
                        <div class="subfont"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* WBNB-PUG FARM */}

            <main role="main" className="farm-list">
              <div class="ewt_balance" align="left">
                <span class="label">
                  <font color="ec6998">
                    <b>
                      WALLET <font color="white"></font> BALANCE:
                    </b>
                  </font>{" "}
                </span>
                <span class="value">
                  <font color="white">
                    {this.state.pug_bnb_clp_wallet_balance}
                  </font>
                </span>
              </div>

              <div class="row">
                <div class="farms-card-item">
                  <div class="icon">
                    <div
                      class="card-icon no-select"
                      style={{ height: "120px", width: "120px" }}
                    >
                      <img src={pugBnb} alt="icon" />
                    </div>
                  </div>
                  <div></div>
                  <div class="label" align="right">
                    <span>
                      $<font color="white">{pair_4}</font>
                    </span>{" "}
                  </div>
                  <div class="rates">
                    <span class="apy">
                      {this.state.reward_pug_bnb_pdt_ammo == 0 ? (
                        <font>
                          {this.state.pug_bnb_apy}
                          <i>
                            <font size="+1">%</font>
                          </i>
                        </font>
                      ) : (
                        <font>
                          <font>
                            <i>$</i>
                            {this.state.reward_pug_bnb_pdt_ammo}
                          </font>
                        </font>
                      )}
                    </span>
                    <span class="apr">
                      {this.state.reward_pug_bnb_pdt_ammo == 0 ? (
                        <font>
                          <font size="+1">
                            <i>APY</i>
                          </font>
                        </font>
                      ) : (
                        `$AMMO`
                      )}
                    </span>
                  </div>
                  <div class="details return" align="right">
                    <div
                      class="bunny-button clickable no-select"
                      onClick={(e) => this.withdraw_pug_bnb_clp(e)}
                    >
                      <div class="content">
                        <font
                          color={
                            this.state.depo_clp_pug_bnb_amount != 0
                              ? "white"
                              : "gray"
                          }
                        >
                          WITHDRAW
                        </font>

                        <font size="1">
                          + <i>$</i>AMMO
                        </font>
                        <div class="subfont"></div>
                      </div>
                    </div>
                  </div>
                  <div class="details total" align="right">
                    <span class="label">Deposited:</span>
                    <span class="value">
                      {this.state.depo_clp_pug_bnb_amount} {pair_4}
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
                    this.state.input_lp_pug_bnb == 0
                      ? "0.0"
                      : this.state.input_lp_pug_bnb
                  }
                  onChange={this.ChangeCLP_PUG_BNB_Amount}
                />
                <span class="token-input-symbol no-select">{pair_4} CLP</span>
                <div
                  class="token-input-max clickable"
                  onClick={(e) => this.ChangeCLP_PUG_BNB_Amount(e)}
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
                      this.deposit_pug_bnb_clp(this.state.input_lp_pug_bnb)
                    }
                  >
                    <div class="content" align="center">
                      <font color="white">DEPOSIT</font>
                      <div class="subfont"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* EXTRA COMMENT END */}
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
                <div
                  class="pot-item empty"
                  style={{ width: "90%", height: "70%" }}
                >
                  <img src={gngLotto} alt="cooking" />
                  <font color="grey">
                    <span>More Coming Soon</span>
                  </font>
                  <font color="grey">
                    <span>If you want to add a New Pair,</span>
                    <span>
                      <font color="fe1e70"> Contact G$wap Devs</font>
                    </span>
                  </font>
                </div>
              </div>
            </div>
            <br></br>
            {/* WBNB-PUG FARM */}

            {/* <main role="main" className="farm-list">
              <div class="ewt_balance" align="left">
                <span class="label">
                  <font color="ec6998">
                    <b>
                      WALLET <font color="white"></font> BALANCE:
                    </b>
                  </font>{" "}
                </span>
                <span class="value">
                  <font color="white">
                    {this.state.pug_susu_clp_wallet_balance}
                  </font>
                </span>
              </div>

              <div class="row">
                <div class="farms-card-item">
                  <div class="icon">
                    <div
                      class="card-icon no-select"
                      style={{ height: "120px", width: "120px" }}
                    >
                      <img src={ammoPug} alt="icon" />
                    </div>
                  </div>
                  <div></div>
                  <div class="label" align="right">
                    <span>
                      $<font color="white">{pair_5}</font>
                    </span>
                  </div>
                  <div class="rates">
                    <span class="apy">
                      {this.state.reward_pug_susu_pdt_ammo == 0
                        ? "$AMMO"
                        : `$${this.state.reward_pug_susu_pdt_ammo}`}
                    </span>
                    <span class="description">
                      {this.state.reward_pug_susu_pdt_ammo == 0 ? "Earn" : `$AMMO`}
                    </span>
                  </div>
                  <div class="details return" align="right">
                    <div
                      class="bunny-button clickable no-select"
                      onClick={(e) => this.withdraw_pug_susu_clp(e)}
                    >
                      <div class="content">
                        <font
                          color={
                            this.state.depo_clp_ammo_usdc_amount != 0
                              ? "white"
                              : "gray"
                          }
                        >
                          WITHDRAW
                        </font>
                        <div class="subfont"></div>
                      </div>
                    </div>
                  </div>
                  <div class="details total" align="right">
                    <span class="label">Deposited:</span>
                    <span class="value">
                      {this.state.depo_clp_ammo_usdc_amount} {pair_5}
                    </span>
                  </div>
                </div>
              </div>
              <br></br>
            </main> */}
            {/* Operating BOX */}
            {/* <div
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
                    this.state.input_lp_pug_susu == 0
                      ? "0.0"
                      : this.state.input_lp_pug_susu
                  }
                  onChange={this.ChangeCLP_PUG_SUSU_Amount}
                />
                <span class="token-input-symbol no-select">{pair_5} CLP</span>
                <div
                  class="token-input-max clickable"
                  onClick={(e) => this.ChangeCLP_PUG_SUSU_Amount(e)}
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
                      this.deposit_pug_susu_clp(this.state.input_lp_pug_susu)
                    }
                  >
                    <div class="content" align="center">
                      <font color="white">DEPOSIT</font>
                      <div class="subfont"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

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
