// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title SafeTransaction interface
 * @dev 
 */

interface ISafeTxn {
  function getTotalProduct() external view returns (uint32);

  function addProduct(uint32 _sellerId, uint32 _productId, uint256 _amount) external returns (bool);

  function purchaseAmountDeposit(uint32 _productId, uint32 _buyerId) external returns (bool);

  function purchaseConfirmation(uint32 _productId) external returns (bool);

  event ProductRegister(address indexed seller, uint32 indexed productId, uint256 value, uint256 timestamp);
  
  event CompleteTransaction(uint32 indexed _escrowId, uint256 indexed timestamp);

  event CancelTransaction(address indexed buyer, address indexed seller, uint32 indexed productId, uint256 timestamp, uint256 value);
  // event Product(address indexed from, address indexed to, uint256  indexed productId, uint256 timestamp, uint256 value);
}