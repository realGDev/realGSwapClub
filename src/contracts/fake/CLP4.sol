// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CLP_4 is ERC20 {
    constructor() public ERC20("CLP4", "CLP4") {}

    function faucet(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
