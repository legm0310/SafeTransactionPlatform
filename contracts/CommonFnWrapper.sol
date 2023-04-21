// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./PandaToken.sol";

/**
ERC20Base의 기능들을 상속해서 사용하기 위해 미리 배포한 ERC20 계약의 인스턴스를 엑세스하여 기능들을 감싸는 래퍼 함수들을 구현한 래퍼 계약
 */
contract CommonFnWrapper {
  PandaToken private _token;

  modifier onlyOwner() {
    if (msg.sender != _token.owner()) {
      revert("Not authorized");
    }
    _;
  }

  constructor(PandaToken token) 
  {
    _token = token;
  }

  //ERC20Base Wrapper
  function mintTo(address _to, uint256 _amount) public virtual{
    _token.mintTo(_to, _amount);
  }

  function burn(uint256 _amount) external virtual{
    _token.burn(_amount);
  }

  //ContractMetadata Wrapper
  function setContractURI(string memory _uri) external {
    _token.setContractURI(_uri);
  }

  //Multicall Wrapper
  function multicall(bytes[] calldata data) external virtual returns (bytes[] memory results){
    results = _token.multicall(data);
    return results;
  }

  //Onwable
  function owner() public view returns (address){
    return _token.owner();
  }
  function setOwner(address _newOwner) external{
    _token.setOwner(_newOwner);
  }

  
  //ERC20Permit Wrapper
  function permit(
    address _owner,
    address _spender,
    uint256 _value,
    uint256 _deadline,
    uint8 _v,
    bytes32 _r,
    bytes32 _s) public virtual{
    _token.permit(_owner, _spender, _value, _deadline, _v, _r, _s);
  }
  function nonces(address _owner) public view virtual returns (uint256){
    return _token.nonces(_owner);
  }
  function DOMAIN_SEPARATOR() public view returns (bytes32){
    return _token.DOMAIN_SEPARATOR();
  }

  //ERC20 Wrapper
  function name() public view virtual returns (string memory){
    return _token.name();
  }
  function symbol() public view virtual returns (string memory){
    return _token.symbol();
  }
  function decimal() public view virtual returns (uint8){
    return _token.decimals();
  }
  function totalSupply() public view virtual returns (uint256){
    return _token.totalSupply();
  }
  function balanceOf(address _account) public view virtual returns (uint256){
    return _token.balanceOf(_account);
  }
  function transfer(address _to, uint256 _amount) public virtual returns (bool){
    _token.transfer(_to, _amount);
    return true;
  }
  function allowance(address _owner, address _spender) public view virtual returns(uint256){
    return _token.allowance(_owner, _spender);
  }
  function approve(address _spender, uint256 _amount) public virtual returns (bool){
    _token.approve(_spender, _amount);
    return true;
  }
  function transferFrom(
    address _from,
    address _to,
    uint256 _amount) public virtual returns (bool){
      _token.transferFrom(_from, _to, _amount);
      return true;
    }
  function increaseAllowance(address _spender, uint256 _addedValue) public virtual returns (bool) {
    _token.increaseAllowance(_spender, _addedValue);
    return true;
  }
  function decreaseAllowance(address _spender, uint256 _subtractedValue) public virtual returns (bool) {
    _token.decreaseAllowance(_spender, _subtractedValue);
    return true;
  }
}