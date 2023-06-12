// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title SafeTransaction interface
 * @dev 
 */

interface ISafeTxn {
  function getTotalProduct() external view returns (uint256);

  function addProduct(uint256 _sellerId, uint256 _amount) external returns (bool);

  function purchaseAmountDeposit(uint256 _productId, uint256 _buyerId) external returns (bool);

  function purchaseConfirmation(uint256 _productId) external returns (bool);

  event ProductRegistered(address indexed buyer, address indexed seller, uint256  indexed productId, uint256 timestamp, uint256 value);
  
  event CancelTransaction(address indexed buyer, address indexed seller, uint256 indexed productId, uint256 timestamp, uint256 value);
  // event Product(address indexed from, address indexed to, uint256  indexed productId, uint256 timestamp, uint256 value);
}