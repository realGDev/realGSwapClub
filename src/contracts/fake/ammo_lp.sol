pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Ammo_lp is ERC20 {
    constructor() ERC20('ammo_lp','AMMO_CLP') public {}

    function faucet(address to, uint amount) external{
        _mint(to, amount);
    }
}