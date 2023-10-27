// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 < 0.9.0;

library Structs{

  struct Product {
    uint32 id;
    uint256 price;
    uint32 sellerId;
    address seller;
    bytes32 prodHash;
  } 

}