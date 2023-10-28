// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title Escrow interface
 * @dev 
 */

interface IEscrow {

  function releaseToSeller(address _seller, uint256 _amount) external returns (bool);

  function refundsToBuyer(address _buyer, uint256 _amount) external returns (bool);

  event EscrowDeposit(address indexed buyer, address indexed seller, uint64 productId, uint256 amount, uint256 indexed timestamp);

  event ReleaseApproval(uint64 indexed escrowId, uint256 indexed timestamp);


  // event CompletedTransaction(address indexed buyer, address indexed seller, uint256 indexed productId, uint256 timestamp, uint256 value);
  
  // event CanceledTransaction(address indexed buyer, address indexed seller, uint256 indexed productId, uint256 timestamp, uint256 value);

    // function totalSupply() external view returns (uint256);

    // function balanceOf(address who) external view returns (uint256);

    // function allowance(address owner, address spender) external view returns (uint256);

    // function transfer(address to, uint256 value) external returns (bool);

    // function approve(address spender, uint256 value) external returns (bool);

    // function transferFrom(
    //     address from,
    //     address to,
    //     uint256 value
    // ) external returns (bool);

    // event Transfer(address indexed from, address indexed to, uint256 value);

    // event Approval(address indexed owner, address indexed spender, uint256 value);
}