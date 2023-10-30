// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "../lib/Structs.sol";
/**
 * @title SafeTransaction interface
 * @dev 
 */

interface ISafeTxn {
  // function getTotalCompleteTx() external view returns (uint64);

  function purchaseAmountDeposit(Structs.Product calldata _prod, uint32 _buyerId) external returns (bool);

  function purchaseConfirmation(uint64 _prodId) external returns (bool);

  event IntegrityCheck(uint64 indexed prodId, uint32 indexed buyerId, bytes32 newHash, bytes32 originalHash, bool isValid);

  event CompleteTransaction(uint64 indexed escrowId, uint256 indexed timestamp);

  event CancelTransaction(address indexed buyer, address indexed seller, uint64 indexed productId, uint256 timestamp, string reason);
}