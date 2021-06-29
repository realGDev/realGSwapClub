// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Ewt_lp is ERC20 {
    constructor() public ERC20("ewt_lp", "EWT_CLP") {}

    function faucet(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
