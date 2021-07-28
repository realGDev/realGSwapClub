pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GangsterStaking is Ownable {
    using SafeERC20 for IERC20;

    struct User {
        uint256 amountGs; // How many LP tokens the user has provided.
        uint256 amountPug; // How many LP tokens the user has provided.
        uint256 burnedAmmo;
        uint256 gsContribution;
        uint256 pugContribution;
        uint256 rewardMultiplier;
        uint256 totalContribution;

    }

    IERC20[] public  tokens;


      constructor(
            IERC20[] _addresses,
        ) public {
             tokens = _addresses;

        }

    mapping(address => User) public allUsers;
    User public user;


    function addToken(IERC20 newTokenAdddress) public onlyOwner{
        //address --> 0xfr4543880853
        tokens.push(IERC20(newTokenAddress));
    }

    function removeToken(uint index) public onlyOwner {
        for (uint i = index; i < tokens.length-1; i++) {
            tokens[index] = tokens[index+1];
        }
        //  Delete last array Element
        tokens.pop();
    }

    function depositPUG() public {
        return false;
    };
    
    function depositGS() public  (bool){
        return false;

    };

    function harvest() public {

        for (uint index = 0; index < tokens.length; index++) {
            tokens[index].

            getThisTokenBalance()
            if()
            //! Recorrer tots els TOKENS i donar-li la seva part. El calcul del que li pertoca es realitza
            // En el moment en el que va a treure? (Cada cop que algu fica o treu, s'actualitza cuan li pertoca)
            // En base al temps que fa que va ficar (y els rewards acomulats ?? )
        }
        
        
        
        return 69;
    };


    function withdraw() public {
        //harvest();
                    uint256 sushiBal = sushi.balanceOf(address(this));

        for (uint index = 0; index < tokens.length; index++) { //<-- Deposited Staking Tokens
            
        }
        
        
        
        return 69;
    };
}
