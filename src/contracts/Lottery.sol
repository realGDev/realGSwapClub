pragma solidity 0.6.12;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract Lottery {
    using SafeMath for uint256;

    mapping(address => uint256) public winnings;
    address[] public tickets;

    string public tokenName = "gLottery";
    string public tokenSymbol = "gLOT";
    uint256 public maxTickets = 100;
    uint256 public remaingTickets = 0;
    uint256 public ticketCount = 0;
    uint256 public randomNum = 0;
    address public latestWinner;
    address payable public gSwapFeeAddress;

    constructor(
        string memory _tokenName,
        string memory _tokenSymbol,
        uint256 _maximumTickets,
        address payable _gSwapFeeAddress
    ) public {
        tokenName = _tokenName;
        tokenSymbol = _tokenSymbol;
        maxTickets = _maximumTickets;
        remaingTickets = maxTickets;
        gSwapFeeAddress = _gSwapFeeAddress;
    }

    function buy() public payable {
        require(msg.value == 500000000000000000); //! 0.5 EWT
        uint256 val = msg.value / 500000000000000000;

        require(remaingTickets - val < remaingTickets);
        remaingTickets -= val;

        tickets.push(msg.sender);
        ticketCount++;
    }

    function withdraw() public {
        require(winnings[msg.sender] > 0);

        uint256 amountToWithdraw = winnings[msg.sender];

        amountToWithdraw *= 500000000000000000;
        uint256 gSwapFee = (amountToWithdraw * 2) / 10;
        amountToWithdraw = amountToWithdraw - gSwapFee;

        gSwapFeeAddress.transfer(gSwapFee);
        msg.sender.transfer(amountToWithdraw);
        winnings[msg.sender] = 0;
    }

    function chooseWinner() public {
        require(ticketCount > 0);
        randomNum = uint256(blockhash(block.number - 1)) % ticketCount;

        latestWinner = tickets[randomNum];

        winnings[latestWinner] = ticketCount;
        ticketCount = 0;
        remaingTickets = maxTickets;

        delete tickets;
    }

    function ticketsLength() external view returns (uint256) {
        return tickets.length;
    }
}
