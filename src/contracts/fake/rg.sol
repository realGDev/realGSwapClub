// SPDX-License-Identifier: MIT

// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RealG is ERC20 {
    constructor(uint256 _supply) public ERC20("RealG", "rG") {
        _mint(msg.sender, _supply * (10**18));
    }
}
