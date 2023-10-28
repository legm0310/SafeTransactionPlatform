// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./interface/ISafeTxn.sol";
import "./interface/IEscrow.sol";
import "./lib/Structs.sol";
import "../node_modules/@thirdweb-dev/contracts/base/ERC20Base.sol";
// import "./PandaToken.sol";
// import "./CommonFnWrapper.sol";

//test
contract SafeTxn is ISafeTxn, IEscrow, ERC20Base {
  address payable private _payMaster;
  uint64 private _totalCompleteTx = 0;
  uint64[] private _tokenDepositedProductIds;

  struct EscrowData {
    uint64 prodId;
    uint256 amount;
    uint32 buyerId;
    address buyer;
    uint32 sellerId;
    address seller;
    bool isApprove;
  }
  mapping(uint64 => EscrowData) escrows;

  modifier onlyPayMaster() {
    require(_payMaster == msg.sender, "Not buyer");
    _;
  }
  modifier onlyBuyer(address _buyer) {
    require(_buyer == msg.sender, "Not buyer");
    _;
  }
  modifier onlySeller(address _seller) {
    require(_seller == msg.sender, "Not seller");
    _;
  }

  constructor(
    string memory _name,
    string memory _symbol
  ) 
    ERC20Base(_name, _symbol) 
  { 
    mintTo(msg.sender, 10000000000*uint(10)**decimals());
  }

  // function getPayMaster() public view onlyOwner() returns (address) {
  //   return _payMaster;
  // }
  // function setPayMaster(address payable _newPayMaster) public onlyOwner() returns (bool) {
  //   require(_newPayMaster != address(0), "Invalid payMaster address");
  //   _payMaster = _newPayMaster;
  //   return true;
  // }

  function getDepositedProductIds() public view virtual returns(uint64[] memory) {
    return _tokenDepositedProductIds;
  }
  function addDepositedProductIds(uint64 _prodId) public virtual returns(bool) {
    _tokenDepositedProductIds.push(_prodId);
    return true;
  }
  function removeDepositedProductIds(uint64 _prodId) public virtual returns(bool) {
    for (uint64 i = 0; i < _tokenDepositedProductIds.length; i++) {
      if( _prodId == _tokenDepositedProductIds[i]) {
        _tokenDepositedProductIds[i] = _tokenDepositedProductIds[_tokenDepositedProductIds.length - 1];
        _tokenDepositedProductIds.pop();
      }
    }
    return true;
  }
  function getTotalCompleteTx() public view virtual override returns (uint64) {
    return _totalCompleteTx;
  }
  function increaseTotalCompleteTx() public virtual returns(uint64) {
    return _totalCompleteTx += 1;
  }

  // 임시 발급 함수
  function tempExchangeToken(address _user, uint256 _amount) public payable virtual returns(bool) {
    _approve(_user, owner(), _amount);
    _transfer(owner(), _user, _amount*(10**18));
    return true;
  }

  // 토큰 발급, 결제 모듈.
  function exchangeToToken() external payable onlyOwner() returns(bool) {
    return true;
  }
  // 토큰 반환(현금 or 네이티브코인 교환)
  function exchangeFromToken() external payable returns (bool) {
    return true;
  }

  function createEscrowAndDeposit(Structs.Product memory _prod, uint32 _buyerId) internal returns(bool) {
    require(escrows[_prod.id].prodId==0, "Already escrow has exists");
    escrows[_prod.id] = EscrowData(
      _prod.id, 
      _prod.price,
      _buyerId, 
      msg.sender, 
      _prod.sellerId,
      _prod.seller, 
      false
      );

    transfer(address(this), _prod.price*(10**18));
    emit EscrowDeposit(msg.sender, _prod.seller, _prod.id, _prod.price, block.timestamp);
    addDepositedProductIds(_prod.id);
    return true;
  }

  function genProductHash(Structs.Product memory _prod) public pure returns(bytes32) {
    return keccak256(abi.encodePacked(_prod.id, _prod.price, _prod.sellerId, _prod.seller));
  }

  function getEscrow(uint64 _escrowId) public view returns(EscrowData memory) {
    return escrows[_escrowId];
  }


  //구매(토큰 예치), 에스크로 기능 실행, msg.sender == 구매자
  function purchaseAmountDeposit(Structs.Product calldata _prod, uint32 _buyerId) public virtual override returns (bool) {
    require(_prod.seller != address(0), "Not found seller address");
    require(_prod.seller != msg.sender, "Invalid buyer address");
    require(_prod.price >= 0, "price of the product is less than zero");
    require(_prod.price <= balanceOf(msg.sender), "Not enough balance");

    bytes32 prodHash = genProductHash(_prod);
    require(_prod.prodHash == prodHash, "Failed to integrity check");

    bool isValid = _prod.prodHash == prodHash;
    emit IntegrityCheck(_prod.id, _buyerId, prodHash, _prod.prodHash, isValid);
  
    createEscrowAndDeposit(_prod, _buyerId);
    return true;
  }

  //제품 확인, 구매 확정, msg.sender == 구매자 (아직 토큰 송금 전 상태)
  function purchaseConfirmation(uint64 _escrowId) external virtual override onlyBuyer(escrows[_escrowId].buyer) returns (bool) {
    require(escrows[_escrowId].buyer != address(0), "Not found escrow");
    
    confirmAndReleaseApprove(escrows[_escrowId]);
    return true;
  }

  function confirmAndReleaseApprove(EscrowData storage escrow) internal returns(bool){
    escrow.isApprove = true;
    emit ReleaseApproval(escrow.prodId, block.timestamp);
    return true;
  }

  //토큰 수령, msg.sender == 판매자
  function onRelease(uint64 _escrowId) external onlySeller(escrows[_escrowId].seller) returns(bool) {
    require(escrows[_escrowId].prodId != 0, "Escrow not found");
    require(escrows[_escrowId].amount <= balanceOf(address(this)), "Not enough balance of contract");
    require(escrows[_escrowId].isApprove == true, "Not approved to Release");

    releaseToSeller(
      escrows[_escrowId].seller, 
      escrows[_escrowId].amount
    );
    emit CompleteTransaction(escrows[_escrowId].prodId, block.timestamp);
    delete escrows[_escrowId]; 
    removeDepositedProductIds(_escrowId);
    increaseTotalCompleteTx();
    return true;
  }

  //구매 취소, 분쟁 발생, 토큰 반환됨
  function purchaseCancel(uint64 _escrowId, string calldata reason) external onlyOwner() returns (bool) {
    require(escrows[_escrowId].prodId != 0, "Escrow not found");
    require(escrows[_escrowId].amount <= balanceOf(address(this)), "Not enough balance of contract");

    refundsToBuyer(
      escrows[_escrowId].buyer,
      escrows[_escrowId].amount
    );
    emit CancelTransaction(escrows[_escrowId].buyer, escrows[_escrowId].seller, escrows[_escrowId].prodId, block.timestamp, reason);
    delete escrows[_escrowId]; 
    removeDepositedProductIds(_escrowId);
    return true;
  }

  //예치 금액 릴리즈
  function releaseToSeller(address _seller, uint256 _amount) public virtual override returns(bool) {
    _transfer(address(this), _seller, _amount*(10**18));
    return true;
  }

  //예치 금액 반환
  function refundsToBuyer(address _buyer, uint256 _amount) public virtual override returns (bool) {
    _transfer(address(this), _buyer, _amount*(10**18));
    return true;
  }
}