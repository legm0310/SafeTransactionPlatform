// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title Escrow interface
 * @dev 
 */

interface IEscrow {

  function releaseToSeller(address _seller, uint256 _amount) external returns (bool);

  function refundsToBuyer(address _buyer, uint256 _amount) external returns (bool);

  event EscrowDeposit(address indexed buyer, address indexed seller, uint64  productId, uint256 amount, uint256 indexed timestamp);

  event ReleaseApproval(uint64 indexed escrowId, uint256 indexed timestamp);
}