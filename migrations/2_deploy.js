const { networks } = require("../truffle-config");

// const SushiToken = artifacts.require("SusuToken.sol");
// const PMasterChef = artifacts.require("PMasterChef.sol");

//TODO: Implement
const GMasterChef = artifacts.require("GMasterChef.sol");
const GSToken = artifacts.require("GSToken.sol");

// //?Fake Tokens
// const Ewt_lp = artifacts.require("Ewt_lp.sol");
// const Ammo_lp = artifacts.require("Ammo_lp.sol");
// const Clp2 = artifacts.require("CLP_2.sol");
// const Clp3 = artifacts.require("CLP_3.sol");
// const Clp4 = artifacts.require("CLP_4.sol");
// const RealG = artifacts.require("RealG.sol");
// const Ej = artifacts.require("Ej.sol");
//? End: Fake Tokens

//? Lottery
// const Lotto = artifacts.require("Lottery.sol");
//? End:  Lottery

//TODO: Testing
module.exports = async function (deployer, _network, addresses) {
  console.log("Working on Deployment Enviroment 👁‍🗨");
  const [admin, _] = addresses;
  const gSwapDev = "0xCb7155Aaa2FE90452379D5aa5eb2c3FE4711698B";
  console.log(`Managing Deployment through: ${admin}`);
  //   //!	This is for testing porpuses

  //   console.log(admin.toString());

  //   //*Faucet fake token
  // await deployer.deploy(Ewt_lp);
  // await deployer.deploy(Ammo_lp);
  // await deployer.deploy(Clp2);
  // await deployer.deploy(Clp3);
  // await deployer.deploy(Clp4);
  // const lp_ewt = await Ewt_lp.deployed();
  // const lp_ammo = await Ammo_lp.deployed();
  // const clp2 = await Clp2.deployed();
  // const clp3 = await Clp3.deployed();
  // const clp4 = await Clp4.deployed();
  // console.log("fake: PUG-AMMO_CLP Address");
  // console.log(lp_ammo.address);
  // console.log("fake: PUG-EWT_CLP Address");
  // console.log(lp_ewt.address);
  // await lp_ewt.faucet(admin, web3.utils.toWei("10000"));
  // await lp_ammo.faucet(admin, web3.utils.toWei("10000"));
  // await clp2.faucet(admin, web3.utils.toWei("10000"));
  // await clp3.faucet(admin, web3.utils.toWei("10000"));
  // await clp4.faucet(admin, web3.utils.toWei("10000"));
  //   //*END: Faucet fake token

  //   //? Establish start and end of PLUS ULTRA rewards
  //TODO: Implement
  const diasStart = 3;
  const diasEnd = 73000;
  try {
    const blockDeploy = await web3.eth.getBlockNumber();
    console.log(blockDeploy);
    let mintingStarts = blockDeploy + (diasStart * 24 * 60 * 60) / 5.95;
    let mintingEnds = blockDeploy + (diasEnd * 24 * 60 * 60) / 5.95;
    mintingStarts = +mintingStarts.toFixed(0);
    mintingEnds = +mintingEnds.toFixed(0);
    console.log(mintingStarts);
    console.log(mintingEnds);
    //   const myBignumber = new web3.utils.BN(futureBlock);
    //   console.log(myBignumber.toString());

    //TODO: Implement
   

  //TODO: Already Deployed to BlockChain (EWC)

    
    
   // *DEPLOYED*  //*GS MasterChef & AMMO SC Deploy

//    await deployer.deploy(GSToken);
//    const gsToken = await GSToken.deployed();
//    //!WALLET NAME: G$_COMISSIONS
//    const gsCommisions = "0x7345477e70D375C34896452A067249165B23Dd55";

//    //!WALLET NAME: G$_MASTERCHEF
//    await deployer.deploy(
//      GMasterChef, //Contract,
//      gsToken.address, //? Parameter 1 --> Direcció del Mint Token (AMMO)
//      gSwapDev, //? Parameter 2 --> Direcció de qui fa el DEPLOY (MasterChef)
//      web3.utils.toWei("0.001074735449735"), //web3.utils.toWei('169'),//? Parameter 3 --> QTT de Ammo per block (uds:)
//      mintingStarts, //? Parameter 4 --> Quan Comença el MINTEO del Token (AMMO)
//      mintingEnds, //? Parameter 5 --> Bloc en el que s'acaba el FAT PERIODD
//      gsCommisions, //? Parameter 6 --> Fee ADDRESS
//      3 //? Parameter 7 --> Bonus Multiplier For init
//    );
//    const gsMasterChef = await GMasterChef.deployed();
//    await gsToken.transferOwnership(gsMasterChef.address);
//    // //! ---end--- GS MasterChef & AMMO SC Deploy
//  } catch (e) {
//    console.log(e);
//  }

      //* ---end--- GS MasterChef & AMMO SC Deploy

  //!
    
    
  //*DEPLOYED* PUG MasterChef & AMMO SC Deploy
  //   await deployer.deploy(SushiToken);
  //   const sushiToken = await SushiToken.deployed();
  //   const ammoCommisions = "0x884c8fac81447E6FBD2f34b71DD72B9C8AadaeA9";

  //   //*WALLET NAME: AMMO_MASTERCHEF
  //   await deployer.deploy(
  //     PMasterChef, //Contract,
  //     sushiToken.address, //? Parameter 1 --> Direcció del Mint Token (AMMO)
  //     gSwapDev, //? Parameter 2 --> Direcció del DEV que fa el DEPLOY (MasterChef)
  //     web3.utils.toWei("5.642364376368273"), //web3.utils.toWei('169'),//? Parameter 3 --> QTT de Ammo per block (uds:)
  //     mintingStarts, //? Parameter 4 --> Quan Comença el MINTEO del Token (AMMO)
  //     mintingEnds, //? Parameter 5 --> Bloc en el que s'acaba el FAT PERIODD
  //     ammoCommisions, //? Parameter 6 --> Fee ADDRESS
  //     2 //? Parameter 7 --> Bonus Multiplier For init
  //   );
  //   const pMasterChef = await PMasterChef.deployed();
  //   await sushiToken.transferOwnership(pMasterChef.address);
  //   console.log(`AMMO_MASTERCHEF (contract): ${pMasterChef.address}`);
  //   console.log("\n");
  //   console.log(`AMMO_TOKEN (contract): ${sushiToken.address}`);
  //
  //* ---end--- PUG MasterChef & AMMO SC Deploy

  //*DEPLOYED* */ LOOTTERY SC Deploy
  // await deployer.deploy(
  //   Lotto,
  //   "G$wap Lotto", //? Parameter 1 --> NameLottery (AMMO)
  //   "gLOTTO", //? Parameter 1 --> Symbol
  //   "250000", //? Parameter 1 --> Nº of Tickets
  //   admin //? Parameter 1 --> Addresses Fee
  // );
  // const lotto = await Lotto.deployed();
  // console.log("G$wap Lottery Address");
  // console.log(lotto.address);
  //* --end-- *DEPLOYED* LOOTTERY SC Deploy

  //*DEPLOYED* rG & Ej SC Deploy
  // await deployer.deploy(RealG, 15000000);
  // const realG = await RealG.deployed();
  // console.log(`Your RealG Token is deployed at address: ${realG.address}`);
  // await deployer.deploy(Ej, 15000000);
  // const ej = await Ej.deployed();
  // console.log(`Your RealG Token is deployed at address: ${ej.address}`);
  //* --end-- *DEPLOYED* rG & Ej SC Deploy
};
