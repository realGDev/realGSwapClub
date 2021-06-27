pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Ewt_lp is ERC20 {
    constructor() ERC20('ewt_lp','EWT_CLP') public {}

    function faucet(address to, uint amount) external{
        _mint(to, amount);
    }
}