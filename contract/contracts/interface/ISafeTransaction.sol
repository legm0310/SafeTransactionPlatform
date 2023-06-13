// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title SafeTransaction interface
 * @dev 
 */

interface ISafeTransaction {
  function getTotalProduct() external view returns (uint256);

  function addProduct(uint256 _amount, string memory _flaws) external returns (bool);

  function purchaseAmountDeposit(uint256 _productId) external returns (bool);

  function purchaseConfirmation() external returns (bool);

}