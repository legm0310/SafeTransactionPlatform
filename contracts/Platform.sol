// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./PandaToken.sol";
import "./CommonFnWrapper.sol";
import "./SafeTransaction.sol";

/**
구현해놓은 기능들을 전부 하나의 계약을 묶음.

생성자 인수로 미리 배포해놓은 토큰 계약의 주소를 전달하여 배포해놓은 인스턴스를 엑세스.
계약 주소는 상속된 기능마다 생성자로 전달하여 모든 기능에 인스턴스를 엑세스 할 수 있음.
 */

contract Platform is SafeTransaction{
  address public paymentSystem;

  constructor(address _tokenAddress) 
    SafeTransaction(PandaToken(_tokenAddress))
  {}
}