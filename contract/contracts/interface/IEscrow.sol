// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title Escrow interface
 * @dev 
 */

interface IEscrow {

  function releaseToSeller(uint256 _escrowId) external returns (bool);

  function refundsToBuyer(uint256 _escrowId) external returns (bool);

  event EscrowInitiated(address indexed buyer, address indexed seller, uint256 productId, uint256 timestamp);

  event EscrowApproved(address indexed buyer, address indexed seller, uint256 productId, uint256 timestamp);

  event EscrowCompleted();

  event CompleteTransaction(address indexed buyer, address indexed seller, uint256 indexed productId, uint256 timestamp, uint256 value);
  
  event CancelTransaction(address indexed buyer, address indexed seller, uint256 indexed productId, uint256 timestamp, uint256 value);

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