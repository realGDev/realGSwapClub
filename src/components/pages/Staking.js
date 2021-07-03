import React, { Component } from "react";

import { Line, Circle } from "rc-progress";
import Countdown from "react-countdown";

import Web3 from "web3";
import "../App.css";

//!AQUI
// import Token from "../../abis/SusuToken.json";
// import MasterChef from "../../abis/MasterChef.json";

import gangster from "../assets/gangster.png";
import ewt from "../assets/ewt.png";
// import ammo from "../assets/ammo.png";
import gngLotto from "../assets/gngLotto.png";
import pugToken from "../assets/pugToken.png";
import ammo from "../assets/ammo.png";

class Stake extends Component {
  async componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch);
    await this.GetLotto_0();
    //!CARREGAR INITIAL DATA;

    this.setState({});
  }

  async loadBlockchainData(dispatch) {
    window.ethereum.on("accountsChanged", function (accounts) {
      window.location.reload();
    });
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      try {
        window.ethereum.enable().then(function () {
          // User has allowed account access to DApp...
        });
      } catch (e) {
        // User has denied account access to DApp...
      }
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

          //* Progra Globals
          web3: web3,
          netId: netId,
        });
      } else {
        window.alert("Please login with MetaMask");
      }

      //load contracts
      try {
        //!AQUI
        //! AQUI-end-
      } catch (e) {
        console.log("Error", e);
        window.alert("Contracts not deployed to the current network");
      }
    } else {
      window.alert("Please install MetaMask");
    }
  }

  async GetLotto_0() {}

  async Buy_gLotto_0() {}

  async Withdraw_gLotto_0() {
    this.setState({});
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div class="root">
          <div class="page" style={{ background: "black" }}>
            <div class="wrapper">
              <br />
              <br />
              <br />
              <br />
              <br />
              <div class="row">
                <div class="container pg">
                  <div class="farms-card-item clickable boost undefined">
                    <h2 color="body" class="sc-gtsrHT sc-fKgJPI hOAElu hnoxXc">
                      <font color="ec6998">Earn $</font>
                      <font color="white">AMMO</font>
                    </h2>
                    <br />

                    <div width="100" height="45">
                      <img src={pugToken} />
                    </div>

                    <div style={{ width: "100%", alignItems: "center" }}>
                      <h2
                        color="body"
                        class="sc-gtsrHT sc-fKgJPI hOAElu hnoxXc"
                      >
                        <font color="ec6998">Stake $</font>
                        <font color="white">PUG</font>
                      </h2>
                      <br />
                      <div
                        class="token-input-wrapper"
                        style={{
                          width: "180%",
                        }}
                      >
                        <input
                          class="token-input"
                          placeholder={
                            this.state.input_lp_ammo == 0
                              ? "0.0"
                              : this.state.input_lp_ammo
                          }
                          onChange={this.ChangeCLP_SUSU_Amount}
                        />
                        <span class="token-input-symbol no-select">PUG</span>
                        <div
                          class="token-input-max clickable"
                          // onClick={(e) => this.ChangeCLP_SUSU_Amount(e)}
                        >
                          MAX
                        </div>
                      </div>
                      <div class="card-content">
                        <div class="farm-detail-control-action-wrapper">
                          <div class="row" style={{ alignItems: "center" }}>
                            <div
                              class="bunny-button clickable no-select"
                              // onClick={(e) =>
                              //   this.deposit_ammo_clp(this.state.input_lp_ammo)
                              // }
                            >
                              <div class="content">
                                <font color="white">DEPOSIT</font>
                                <div class="subtext"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <font color="4ed8de" size="+2">
                        AMMO Rewards <br />
                      </font>
                      <font color="4ed8de" size="+4">
                        2.000.000
                      </font>
                    </div>
                  </div>
                </div>
              </div>
              {/* SEPARACIÓ ENTRE STAKES */}
              <br />
              <br />
              {/* AQUI ESTA EL STAKING DE AMMO
              
              <div class="container pg card-header">
                <div class="farms-card-item clickable boost-subimp">
                  <h2 color="body" class="sc-gtsrHT sc-fKgJPI hOAElu hnoxXc">
                    Earn AMMO
                  </h2>
                  <div color="textSubtle" class="sc-gtsrHT jPTSoQ">
                    Stake FISH
                  </div>
                  <div width="10" height="10" class="sc-bCwfaz dYUWDQ">
                    <img src={ammo} sizes="20" />
                  </div>
                </div>
              </div> */}

              <div class="container pg">
                <div
                  class="pot-list"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div class="pot-item empty ">
                    <img src={gngLotto} alt="cooking" />
                    <font color="grey">
                      <span>More Coming soon</span>
                    </font>
                    <font color="grey">
                      <span>This is just the begining</span>{" "}
                    </font>
                  </div>
                </div>
              </div>
              <br></br>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Stake;
