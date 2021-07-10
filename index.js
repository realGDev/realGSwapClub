const Web3 = require("web3");
const PMasterChefContract = require("./src/abis/PMasterChef.json");
const GMasterChefContract = require("./src/abis/GMasterChef.json");
const Ewt_Contract = require("./src/abis/Ewt_lp.json");
const SusuContract = require("./src/abis/SusuToken.json");
const GSToken = require("./src/abis/GSToken.json");
const LotteryContract = require("./src/abis/Lottery.json");
const HDWalletProvider = require("@truffle/hdwallet-provider");

require("dotenv").config();

//!PROVABI

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

//!PROVABI

const test = async () => {
  const web3 = new Web3("http://localhost:9545");
  // const web3 = new Web3(window.web3.currentProvider);

  // console.log(process.env.MNEMONIC);
  // const mySeed = [process.env.MNEMONIC];
  // console.log(mySeed);
  const id = await web3.eth.net.getId();
  console.log(id);

  const addresses = await web3.eth.getAccounts();

  for (let index = 0; index < 200; index++) {
    console.log(index + 1);
    if (index % 2 == 0) {
      await web3.eth.sendTransaction({
        from: addresses[0],
        to: addresses[1],
        value: web3.utils.toWei("20"),
      });
      console.log("A envia a B");
    } else {
      await web3.eth.sendTransaction({
        from: addresses[1],
        to: addresses[0],
        value: web3.utils.toWei("20"),
      });
      console.log("B envia a A");
    }
  }
  console.log("Palomada Finished");
  // const addingPairContract = new web3.eth.Contract(tokenABI, '0xc61500fa1bfa61312c71393a202149bac9ce1de4');
  // console.log(addingPairContract);
  // console.log('Before adding Pool');
  // const addresses = await web3.eth.getAccounts();
  // console.log(`Managing Testing through Address: ${addresses[0]}`);

  // const block = await web3.eth.getBlockNumber();
  // console.log(block);
  // const pdtSushi = await masterContract.methods.pendingSushi(0, addresses[0]).call();
  // console.log(web3.utils.fromWei(pdtSushi));

  // const fakeTokenBalance = await ewt_lp.methods.balanceOf('0x87Cc2C0a73b7875b69888E13C6AAeDd37D2A6EEa').call();
  // console.log(web3.utils.fromWei(fakeTokenBalance));
  //     const ammo = new web3.eth.Contract(SusuContract.abi,SusuContract.networks[id].address);
  //     const ammo_init_bal = await ammo.methods.balanceOf(addresses[0]).call();
  //     console.log(`AMMO initial Balance: ${web3.utils.fromWei(ammo_init_bal)} $AMMO`);

  //     try {
  //         const ewt_lp = new web3.eth.Contract(tokenABI, Ewt_Contract.networks[id].address);
  //         // console.log(`CLP Address: ${Ewt_Contract.networks[id].address}`);
  //         const bal_ini = await ewt_lp.methods.balanceOf(addresses[0]).call();
  //         console.log(`Balance Init Script: ${web3.utils.fromWei(bal_ini)} CLP (PUG - EWT)`);
  //         // await addresses[0].approve(Ewt_Contract.networks[id].address, web3.utils.toWei('1000'));
  //         // await ewt_lp.methods.approve(Ewt_Contract.networks[id].address, web3.utils.toWei('1000')).send({
  //         //     from: addresses[0]
  //         // });
  //         const allow = await ewt_lp.methods.approve(deployedNetwork.address, web3.utils.toWei('100000')).send(
  //             { from: addresses[0] }
  //         );
  //         // console.log(`¿Allowed? ---> ${allow}`);

  //         // const resultat = ewt_lp.methods.allowance(addresses[0],Ewt_Contract.networks[id].address);
  //         // console.log(`¿Allowance? ---> ${resultat}`);

  //     } catch (e) {
  //         console.log(e.toString());
  //     }
  //     // console.log('Contract instance OOK');

  //     const poolLength_0 = await masterContract.methods.poolLength().call();
  //     console.log(`Inital Nº Pools: ${poolLength_0.toString()}`);
  //     try {

  //         //!EXAMPLE: How to add a POOL!
  //         // console.log('\n\n--- ADDING POOL ($PUG-EWT)---\n');
  //         // await masterContract.methods.add(25, Ewt_Contract.networks[id].address, true).send({
  //         //     from: addresses[0],
  //         //     gas: 800000
  //         // }).then(() => {
  //         //     console.log('\n--- NEW POOL ADDED ---\n\n');
  //         // });

  //         // //*Grab pool Info
  //         const data = await masterContract.methods.poolInfo(0).call();
  //         console.log(data);

  //     } catch (e) {
  //         console.log(e.toString());
  //     }

  //     const poolLength = await masterContract.methods.poolLength().call();
  //     console.log(`Post-Addition Nº Pools: ${poolLength}`);

  //    //! DEPOSIT & WITHDRAW CLPs !
  //     try {   //* Interacting with SmartContract

  //         const clp_contract = new web3.eth.Contract(Ewt_Contract.abi, Ewt_Contract.networks[id].address);
  //         const preDep = await clp_contract.methods.balanceOf(addresses[0]).call();
  //         //!EXAMPLE: Deposit CLP to MasterChef
  //         console.log(`Balance Pre DEPOSIT: ${web3.utils.fromWei(preDep)}`);

  // const deposit = await masterContract.methods.deposit(0, web3.utils.toWei('894')
  // ).send({
  //         from: addresses[0],
  //         gas:4700000,
  //         gasPrice:8000000000
  //     });
  //     // console.log(deposit.events);

  //         const bal_postDep = await clp_contract.methods.balanceOf(addresses[0]).call();
  //         console.log(`Balance Post DEPOSIT: ${web3.utils.fromWei(bal_postDep)}`);

  //         const block = await web3.eth.getBlockNumber();
  //         console.log(`THE CURRENT BLOCK:    ${block}`);

  //         const pendingSushiA = await masterContract.methods.pendingSushi(0,addresses[0]).call();
  //         console.log(`\nPending AMMO 2 Claim:  ${web3.utils.fromWei(pendingSushiA)}\n`)

  //         // //TODO: ADVANCE TIME
  //         // const milliseconds = 20 * 1000
  //         // const p = await new Promise(resolve => setTimeout(resolve, milliseconds))
  //         // //TODO: END ADVANCE TIME
  //         // const pendingSushiB = await masterContract.methods.pendingSushi(0,addresses[0]).call();
  //         // console.log(`\nPending AMMO 2 Claim:  ${web3.utils.fromWei(pendingSushiB)}\n`)

  //         // const block_2 = await web3.eth.getBlockNumber();
  //         console.log('READY FOR WITHDRAW!');
  //         // console.log(`THE CURRENT BLOCK:    ${block_2}`);

  //         // //!EXAMPLE: Withdraw CLP from MasterChef
  //         // const withdraw = await masterContract.methods.withdraw(0, web3.utils.toWei('1000')
  //         // ).send({
  //         //     from: addresses[0],
  //         //     gas:4700000,
  //         //     gasPrice:8000000000
  //         // });
  //         // // console.log(withdraw.events);

  //         const bal_end = await clp_contract.methods.balanceOf(addresses[0]).call();
  //         console.log(`Balance Post Withdraw: ${web3.utils.fromWei(bal_end)} CLP (PUG - EWT)`);

  //         //! EXAMPLE: Get $AMMO Balance
  //         const ammo_end_bal = await ammo.methods.balanceOf(addresses[0]).call();
  //         console.log(`AMMO Final Balance: ${web3.utils.fromWei(ammo_end_bal)} $AMMO`);

  //     } catch (e) {
  //         console.log(e.toString());
  //     }
};
const change_PUG_MasterChefMultiplier = async (newNum) => {
  let provider = new HDWalletProvider(
    [process.env.MNEMONIC],
    "https://rpc.energyweb.org"
  );

  const web3 = new Web3(provider);
  const gas = new web3.utils.BN("6000000");
  const gasPrice = new web3.utils.BN("1");

  const id = await web3.eth.net.getId();
  console.log(id);
  const masterChef = new web3.eth.Contract(
    PMasterChefContract.abi,
    PMasterChefContract.networks[id].address
  );

  const addresses = await web3.eth.getAccounts();
  try {
    const multi = await masterChef.methods.changeMultiplier(newNum).send({
      from: addresses[0],
      gas: gas,
      gasPrice: gasPrice,
    });
    console.log(`ANSWER when changing multiplier: ${multi.toString()}`);
    console.log(`Multiplier was set to ${newNum}`);
  } catch (e) {
    console.log(e.toString());
    console.log(`Was no able to change multiplier to ${newNum}`);
  }
};

const change_GANGSTER_MasterChefMultiplier = async (newNum) => {
  const web3 = new Web3("http://localhost:9545");
  // const web3 = new Web3(window.web3.currentProvider);

  // console.log(process.env.MNEMONIC);
  // const mySeed = [process.env.MNEMONIC];
  // console.log(mySeed);
  const id = await web3.eth.net.getId();
  console.log(id);
  const masterChef = new web3.eth.Contract(
    PMasterChefContract.abi,
    PMasterChefContract.networks[id].address
  );

  const addresses = await web3.eth.getAccounts();

  const multi = await masterChef.methods.changeMultiplier(newNum).send({
    from: addresses[0],
  });

  console.log(`ANSWER when changing multiplier: ${multi.toString()}`);
  console.log("Palomada Finished");
};

//? Function to add Pair to Master Chef --> address Pair, Name Pair, pes de la pool
const addPugPool = async (poolAd, alloc) => {
  let provider = new HDWalletProvider(
    [process.env.MNEMONIC],
    "https://rpc.energyweb.org"
  );

  const web3 = new Web3(provider);

  const poolAddress = poolAd;
  console.log(poolAddress);

  const id = await web3.eth.net.getId();
  console.log(`Adding POOL in Network ${id}`);
  const deployedNetwork = PMasterChefContract.networks[id];
  const masterContract = new web3.eth.Contract(
    PMasterChefContract.abi,
    deployedNetwork.address
  );

  // const addingPairContract = new web3.eth.Contract(tokenABI, poolAddress);
  // console.log(`\n\nRemember to add in index.js the following pool INFO:\n ${poolAddress}, ${poolName}, ${alloc}\n\n`);

  //! Deployer address --> change to REAL address
  const addresses = await web3.eth.getAccounts();
  console.log(`Managing Deployment through Address: ${addresses[0]}`);
  const deployer = addresses[0];

  const poolLength_0 = await masterContract.methods.poolLength().call();
  console.log(`Nº Pools (before Addintion): ${poolLength_0.toString()}`);

  try {
    //TODO: How to add a POOL!
    console.log(`\n\n--- ADDING POOL ---\n`);
    await masterContract.methods
      .add(alloc, poolAddress, true)
      .send({
        from: deployer,
        gas: 800000,
      })
      .then((e) => {
        console.log(`\n--- ADDED TO Master Chef ---\n\n`);
      });

    // //*Grab pool Info
    const data = await masterContract.methods.poolInfo(poolLength_0).call();
    console.log(` INFO:`);
    console.log(data);
  } catch (e) {
    console.log(`ERROR ADING PUG THE FARMING POOL`);
    console.log(e.toString());
  }

  const poolLength = await masterContract.methods.poolLength().call();
  console.log(`Nº Pools (Post-Addition): ${poolLength}`);
};

const addGSPool = async (poolAd, alloc) => {
  let provider = new HDWalletProvider(
    [process.env.MNEMONIC],
    "https://rpc.energyweb.org"
  );

  const web3 = new Web3(provider);

  const poolAddress = poolAd;
  console.log(poolAddress);

  const id = await web3.eth.net.getId();
  console.log(`Adding POOL in Network ${id}`);
  const deployedNetwork = GMasterChefContract.networks[id];
  const masterContract = new web3.eth.Contract(
    GMasterChefContract.abi,
    deployedNetwork.address
  );

  // const addingPairContract = new web3.eth.Contract(tokenABI, poolAddress);
  // console.log(`\n\nRemember to add in index.js the following pool INFO:\n ${poolAddress}, ${poolName}, ${alloc}\n\n`);

  //! Deployer address --> change to REAL address
  const addresses = await web3.eth.getAccounts();
  console.log(`Managing Deployment through Address: ${addresses[0]}`);
  const deployer = addresses[0];

  const poolLength_0 = await masterContract.methods.poolLength().call();
  console.log(`Nº Pools (before Addintion): ${poolLength_0.toString()}`);

  try {
    //TODO: How to add a POOL!
    console.log(`\n\n--- ADDING POOL ---\n`);
    await masterContract.methods
      .add(alloc, poolAddress, true)
      .send({
        from: deployer,
        gas: 800000,
      })
      .then((e) => {
        console.log(`\n--- ADDED TO Master Chef ---\n\n`);
      });

    // //*Grab pool Info
    const data = await masterContract.methods.poolInfo(poolLength_0).call();
    console.log(` INFO:`);
    console.log(data);
  } catch (e) {
    console.log(`ERROR ADING GANGSTER THE FARMING POOL`);
    console.log(e.toString());
  }

  const poolLength = await masterContract.methods.poolLength().call();
  console.log(`Nº Pools (Post-Addition): ${poolLength}`);
};

//? Function to get INFORMATION FROM A POOL --> pool Id
const getPoolsData = async (pid) => {
  const web3 = new Web3("http://localhost:9545");

  const poolId = pid;
  console.log(poolId);

  const id = await web3.eth.net.getId();
  const deployedNetwork = PMasterChefContract.networks[id];
  const masterContract = new web3.eth.Contract(
    PMasterChefContract.abi,
    deployedNetwork.address
  );

  //! Deployer address --> change to REAL address
  const addresses = await web3.eth.getAccounts();
  console.log(`Managing Deployment through Address: ${addresses[0]}`);
  const deployer = addresses[0];

  try {
    const poolLength = await masterContract.methods.poolLength().call();
    console.log(`Total Nº of POOLS: ${poolLength}`);

    for (let index = 0; index < poolLength; index++) {
      // //*Grab pool Info
      let data = await masterContract.methods.poolInfo(index).call();
      console.log(data);
    }
  } catch (e) {
    console.log(`Error Getting FARM DATA: ${poolName}`);
    console.log(e.toString());
  }
};

const chooseWinnerLottoEwt = async () => {
  let provider = new HDWalletProvider(
    [process.env.MNEMONIC],
    "https://rpc.energyweb.org"
  );

  const web3 = new Web3(provider);

  const id = await web3.eth.net.getId();
  const deployedNetwork = LotteryContract.networks[id];
  const lotteryContract = new web3.eth.Contract(
    LotteryContract.abi,
    LotteryContract.networks[id].address
  );

  //! Deployer address --> change to REAL address

  const addresses = await web3.eth.getAccounts();
  console.log(`Purhasing through Address: ${addresses[0]}`);
  const deployer = addresses[0];
  const buyingAmount = new web3.utils.BN("500000000000000000");
  const gas = new web3.utils.BN("6000000");
  const gasPrice = new web3.utils.BN("1");

  const commiPre = web3.eth.getBalance(addresses[0]);

  try {
    const lotBal = await web3.eth.getBalance(
      LotteryContract.networks[id].address
    );

    const leng = await lotteryContract.methods.ticketsLength().call();
    console.log(`The TOTAL Nº Of Purchased gLotto: ${leng.toString()}`);
    console.log(`TOTAL JACKPOT: ${web3.utils.fromWei(lotBal)} EWT`);

    //* SNAPSHOT DE TOTS ELS PARTICIPANTS
    console.log("PARTICIPANTS:\n");
    let array = [];
    let trobat = false;
    for (let index = 0; index < leng; index++) {
      const participant = await lotteryContract.methods.tickets(index).call();
      for (let j = 0; j < array.length; j++) {
        if (participant == array[j]) {
          trobat = true;
        }
      }
      if (trobat != true) {
        console.log(participant);
        array.push(participant);
      }
      trobat = false;
    }
    console.log(array);
    console.log(`Total nº Participants: ${array.length}`);

    //! Choose winner
    await lotteryContract.methods.chooseWinner().send({
      from: deployer,
      gas: gas,
      gasPrice: gasPrice,
    });

    const commiPost = await web3.eth.getBalance(deployer);

    const commiEarn =
      web3.utils.fromWei(commiPost) - web3.utils.fromWei(commiPre);
    console.log(`G$wap gets rewarded with: ${commiEarn}`);

    console.log(
      web3.utils.fromWei(
        await web3.eth.getBalance(lotteryContract.options.address)
      )
    );
  } catch (error) {
    console.log("MY ERROR: ");
    console.log(error.toString());
  }
};

const interactWithLottery = async () => {
  const web3 = new Web3("http://localhost:9545");

  const id = await web3.eth.net.getId();
  const deployedNetwork = LotteryContract.networks[id];
  const lotteryContract = new web3.eth.Contract(
    LotteryContract.abi,
    LotteryContract.networks[id].address
  );

  //! Deployer address --> change to REAL address

  const addresses = await web3.eth.getAccounts();
  // console.log(`Purhasing through Address: ${addresses[1]}`);
  // const deployer = addresses[0];
  // const comissioner = addresses[1];
  // const buyer = addresses[2];
  const buyingAmount = new web3.utils.BN("500000000000000000");
  const gas = new web3.utils.BN("6000000");
  const gasPrice = new web3.utils.BN("3");

  try {
    // console.log('---INIT: PURCHASE');

    const lotBal = await web3.eth.getBalance(
      LotteryContract.networks[id].address
    );
    console.log(`Lottery Balance: ${web3.utils.fromWei(lotBal)}`);
    // await buyer.transfer("1000000000000000000");
    // console.log(lotteryContract.methods);

    //! BUY gLOTTO
    for (let index = 0; index < 50; index++) {
      await lotteryContract.methods.buy().send({
        from: addresses[0],
        value: buyingAmount,
        gas: gas,
      });
    }

    // console.log('----FINISHED PURCHASE');
    const leng = await lotteryContract.methods.ticketsLength().call();
    console.log(`The TOTAL Nº Of Purchased gLotto: ${leng.toString()}`);
    const bal = await web3.eth.getBalance(lotteryContract.options.address);
    const buyerBalancePreWith = await web3.eth.getBalance(buyer);
    const commiPre = await web3.eth.getBalance(comissioner);
    console.log(buyerBalancePreWith);
    console.log(`Total JACKPOT: ${web3.utils.fromWei(bal)} EWT`);

    // // console.log('---TRY: WITHDRAW (Not finished LOTTO)');
    // // await lotteryContract.methods.withdraw().send({from:buyer});

    //* SNAPSHOT DE TOTS ELS PARTICIPANTS

    // console.log("WINNERS:\n");
    // const winners = await lotteryContract.methods
    //   .winnings("0x87Cc2C0a73b7875b69888E13C6AAeDd37D2A6EEa")
    //   .call();
    // console.log(winners);
    console.log("PARTICIPANTS:\n");
    let array = [];
    let trobat = false;
    for (let index = 0; index < leng; index++) {
      const participant = await lotteryContract.methods.tickets(index).call();
      for (let j = 0; j < array.length; j++) {
        if (participant == array[j]) {
          trobat = true;
        }
      }
      if (trobat != true) {
        console.log(participant);
        array.push(participant);
      }
      trobat = false;
    }
    console.log(array);
    console.log(`Total nº Participants: ${array.length}`);

    //! Choose winner
    // await lotteryContract.methods.chooseWinner().send({
    //   from: deployer,
    //   gas: gas,
    //   gasPrice: gasPrice,
    // });

    // for (let index = 0; index < array.length; index++) {
    //   let earn = await lotteryContract.methods
    //     .winnings(addresses[index])
    //     .call();
    //   if (earn != 0) {
    //     console.log(`Address: ${addresses[index]} has EARNed --> ${earn}`);
    //   } else {
    //     console.log(`Address: ${addresses[index]} better luck...nxtt`);
    //   }
    // }

    //? Checkwinners
    // const data = await lotteryContract.methods
    //   .winnings("0xF3CffA50d8c02e1c8382f10ced19Bd8E9D3188a4")
    //   .call();
    // console.log(`${data}`);

    //! WITHDRAW PRICE
    // await lotteryContract.methods.withdraw().send({ from: addresses[3] });

    // const buyerBalancePost = await web3.eth.getBalance(address[3]);
    // const commiPost = await web3.eth.getBalance(comissioner);

    // const amountEarn =
    //   web3.utils.fromWei(buyerBalancePost) -
    //   web3.utils.fromWei(buyerBalancePreWith);
    // console.log(`Buyer gets rewarded with: ${amountEarn}`);
    // const commiEarn =
    //   web3.utils.fromWei(commiPost) - web3.utils.fromWei(commiPre);
    // console.log(`G$wap gets rewarded with: ${commiEarn}`);

    console.log(
      web3.utils.fromWei(
        await web3.eth.getBalance(lotteryContract.options.address)
      )
    );
  } catch (error) {
    console.log("MY ERROR: ");
    console.log(error.toString());
  }
};

//TODO: FUNCTION REPOSITORY
//! Mainnet
// chooseWinnerLottoEwt();
//!PUG MasterChef
// addPugPool("", 1); //? (FUNCTION)  Add Pools (ADDRESS pool)
//TODO pid --> (0): '0xc61500fa1bfa61312c71393a202149bac9ce1de4','PUG-WEWT', 3
//TODO pid --> (1): '0x6a6a9a7215b402771d2a35866a2c445cdc2a4019','PUG-SUSU', 2
//TODO pid --> (2): '0xdc3323a7cd9bd55660f6a461cd14f91c2668de27','PUG-USDC', 1
//TODO pid --> (3): '0x9bdb88dff2d0639d4824512152794114f557d411','PUG-WBNB', 1
// change_PUG_MasterChefMultiplier(1);

//!----end_PUG MasterChef

//!G$ MasterChef
// addGSPool("", 1); //? (FUNCTION)  Add Pools (ADDRESS pool)
//TODO pid --> (0): '0x20ae3646e74dfec646b2788286065f642245ca5f','AMMO-USDC', 2
//TODO pid --> (1): '0x41c49ef86f513498D9Be19F4E920a6Afbe8Af4Cb','G$ Staking', 1
//!---end G$ MasterChef

//! (end) Mainnet

//     EXECUTABLE FUNCTIONS
//*    Important to READ
//?    Code clarifications

//* Function_1: Testing
// test();

//* Function_2: Get Information
// getPoolsData(0); //? (FUNCTION) Get Information of Pools

//* Function_3: Add Pair into MasterChef
//* Those are already deployed (DO NOT ADD THEM AGAIN)

// addGangsterPool("0x8234C05b97ea08b76A1FeF3dedFF0A45FD84f36a", 1); //? (FUNCTION)  Add Pools (ADDRESS pool)

//* Function 4: LOTTERY TESTING
// interactWithLottery();

//* Function 5: LOTTERY TESTING
// change_GANGSTER_MasterChefMultiplier

//? TESTING NOTES
// // Pool_0 --> 0x8234C05b97ea08b76A1FeF3dedFF0A45FD84f36a (PUG-FAKE_ewt) (alloc = 1)
// // Pool_1 --> 0x225aBf23b294E96Ee97DCdDBbB7B9241dd5d49D9 (PUG-AMMO) (alloc = 2)

// Pool_2 --> 0xc61500fa1bfa61312c71393a202149bac9ce1de4 (PUG-EWT) (alloc = 1)

//* Real SHIT FUNCTIONS -----------------

//* In order to operate with a wallet -->

//! Així es pot fer servir una wallet (cal importar la priv Key a .env + incloure'l al gitignore)
// const HDWalletProvider = require("@truffle/hdwallet-provider");
// const Web3 = require("web3");
// let provider = new HDWalletProvider(
//   [process.env.MNEMONIC],
//   "https://rpc.energyweb.org"
// );
