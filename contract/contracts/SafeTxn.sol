// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./interface/ISafeTxn.sol";
import "./interface/IEscrow.sol";
import "../node_modules/@thirdweb-dev/contracts/base/ERC20Base.sol";
// import "./PandaToken.sol";
// import "./CommonFnWrapper.sol";

contract SafeTxn is ISafeTxn, IEscrow, ERC20Base {
  uint256 private _totalProduct = 0; // 발급된 제품 수 
  uint256[] public registeredProducts;   // 제품 리스트
  uint256[] public tokenDepositedProducts; // 구매 진행중, 물건 확인 전 제품들 리스트
  enum State {NULL, SALE, RESERVED, COMPLETE}

  struct Product {
    uint256 productId;
    uint256 price;
    uint256 sellerId;
    address sellerAddress;
    State status;
  } 
  mapping(uint256 => Product) products;

  struct EscrowData {
    uint256 escrowId;
    uint256 buyerId;
    address buyerAddress;
    uint256 sellerId;
    address sellerAddress;
    uint256 amount;
    // mapping(uint=>address) buyer;
    // mapping(uint=>address) seller;
  }
  mapping (uint256 => EscrowData) escrows;

  constructor(
    string memory _name,
    string memory _symbol
  ) 
    ERC20Base(_name, _symbol) 
  { 
    mintTo(msg.sender, 1000000000*uint(10)**decimals());
  }

  function getTotalProduct() public view virtual override returns (uint256) {
    return _totalProduct;
  }
  function increaseTotalProduct() public virtual returns(uint256) {
    return _totalProduct += 1;
  }

  //제품 등록
  function addProduct(uint256 _sellerId, uint256 _amount) public virtual override returns (bool) {
    require(_amount>=0, "price of the product is less than zero");
    uint256 newProductId = increaseTotalProduct();

    products[newProductId] = Product(newProductId, _amount, _sellerId, msg.sender, State.SALE);
    return true;
  }

  function setProductStatus(Product storage _product, State _status) internal returns(bool) {
    _product.status = _status;
    return true;
  }


  //제품 삭제
  //제품 수정


  //구매(토큰 예치), 에스크로 기능 실행
  //msg.sender = 구매자
  function purchaseAmountDeposit(uint256 _productId, uint256 _buyerId) public virtual override returns (bool) {

    require(products[_productId].sellerAddress != address(0), "Not found product");
    Product storage product = products[_productId];

    require(balanceOf(msg.sender) >= product.price * 10**decimals(), "Not enough balance");
    transfer(address(this), product.price * 10**decimals());
    createEscrow(product, _buyerId);

    setProductStatus(product, State.RESERVED);
    emit EscrowInitiated(msg.sender, product.sellerAddress, _productId, block.timestamp);

    return true;
  }

  function createEscrow(Product storage _product, uint256 _buyerId) internal returns(bool) {
    escrows[_product.productId] = EscrowData(_product.productId, _buyerId, msg.sender, _product.sellerId, _product.sellerAddress, _product.price);
    return true;
  }

  //구매완료, 제품 확인
  //msg.sender = 구매자 
  function purchaseConfirmation(uint256 _productId) public virtual override returns (bool) {
    require(products[_productId].sellerAddress != address(0), "Not found product");
    require(escrows[_productId].buyerAddress != address(0), "Not found escrow");

    Product storage product = products[_productId];
    EscrowData storage escrow = escrows[_productId];

    require(balanceOf(address(this)) >= escrow.amount, "Not enough balance of contract");


    emit EscrowApproved(escrow.buyerAddress, escrow.sellerAddress, _productId, block.timestamp);
    

    return true;
  }

  function confirmProductReceived(uint256 _escrowId) internal returns(bool){
    require(msg.sender == escrows[_escrowId].buyerAddress, "" );
    escrows[_escrowId].isConfirmation = true;
  }

  //예치 금액 릴리즈
  function releaseToSeller(uint256 _escrowId) public virtual override returns(bool) {
    require(escrows[_escrowId].isConfirmation == true, "");
    require(_transfer(address(this), _escrow.sellerAddress, _escrow.amount * 10**decimals()), "Transfer failed");
    emit EscrowCompleted();
    return true;
  }

  function refundsToBuyer(uint256 _escrowId) public virtual override returns (bool) {

    return true;
  }
}