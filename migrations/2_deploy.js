const { networks } = require("../truffle-config");

const SushiToken = artifacts.require("SusuToken.sol");
const MasterChef = artifacts.require("MasterChef.sol");

//?Fake Tokens
const Ewt_lp = artifacts.require("Ewt_lp.sol");
const Ammo_lp = artifacts.require("Ammo_lp.sol");
const RealG = artifacts.require("RealG.sol");
//? End: Fake Tokens

//? Lottery
const Lotto = artifacts.require("Lottery.sol");
//? End:  Lottery

//TODO: PRODUCTION
// module.exports = async function (deployer, _network, addresses) {

// 	const [admin, _] = addresses;
// 	console.log(admin.toString());

// 	await deployer.deploy(SushiToken);
// 	const sushiToken = await SushiToken.deployed();

// 	await deployer.deploy(MasterChef,
// 		sushiToken.address,
// 		admin,
// 		web3.utils.toWei('169'),
// 		12352100,
// 		12362100
// 	);
// 	const masterChef = await MasterChef.deployed();
// 	await sushiToken.transferOwnership(masterChef.address);

// }

//TODO: Testing
module.exports = async function (deployer, _network, addresses) {
  console.log("Working on Testing Enviroment 👁‍🗨");
  const [admin, _] = addresses;
  //   const dias = 7;
  console.log(`Managing Deployment through: ${admin}`);
  //   //!	This is for testing porpuses

  //   console.log(admin.toString());

  //   await deployer.deploy(SushiToken);
  //   const sushiToken = await SushiToken.deployed();

  //   //!Faucet fake token
  //   await deployer.deploy(Ewt_lp);
  //   await deployer.deploy(Ammo_lp);
  //   const lp_ewt = await Ewt_lp.deployed();
  //   const lp_ammo = await Ammo_lp.deployed();
  //   console.log("fake: PUG-AMMO_CLP Address");
  //   console.log(lp_ammo.address);
  //   console.log("fake: PUG-EWT_CLP Address");
  //   console.log(lp_ewt.address);
  //   await lp_ewt.faucet(admin, web3.utils.toWei("10000"));
  //   await lp_ammo.faucet(admin, web3.utils.toWei("10000"));
  //   //!END: Faucet fake token

  //   //? Establish start and end of PLUS ULTRA rewards
  //   const blockDeploy = await web3.eth.getBlockNumber();
  //   const futureBlock = blockDeploy + (dias * 24 * 60 * 60) / 6.5;
  //   const myBignumber = new web3.utils.BN(futureBlock);
  //   console.log(myBignumber.toString());

  //   await deployer.deploy(
  //     MasterChef, //Contract,
  //     sushiToken.address, //? Parameter 1 --> Direcció del Mint Token (AMMO)
  //     admin, //? Parameter 2 --> Direcció de qui fa el DEPLOY (MasterChef)
  //     web3.utils.toWei("7.52"), //web3.utils.toWei('169'),//? Parameter 3 --> QTT de Ammo per block (uds:)
  //     blockDeploy, //? Parameter 4 --> Quan Comença el MINTEO del Token (AMMO)
  //     myBignumber, //? Parameter 5 --> Bloc en el que s'acaba el FAT PERIODD
  //     addresses[1] //? Parameter 6 --> Fee ADDRESS
  //   );
  //   const masterChef = await MasterChef.deployed();
  //   await sushiToken.transferOwnership(masterChef.address);

  //! LOOTTERY SC Deploy
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
  //! --end-- LOOTTERY SC Deploy

  //! rG SC Deploy
  await deployer.deploy(RealG, 15000000);
  const realG = await RealG.deployed();
  console.log(`Your RealG Token is deployed at address: ${realG.address}`);
  //! --end-- rG SC Deploy
};
