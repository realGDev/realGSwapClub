// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Ammo_lp is ERC20 {
    constructor() public ERC20("ammo_lp", "AMMO_CLP") {}

    function faucet(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
