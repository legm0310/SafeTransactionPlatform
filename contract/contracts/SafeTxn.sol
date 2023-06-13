// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./interface/ISafeTxn.sol";
import "./interface/IEscrow.sol";
import "../node_modules/@thirdweb-dev/contracts/base/ERC20Base.sol";
// import "./PandaToken.sol";
// import "./CommonFnWrapper.sol";

contract SafeTxn is ISafeTxn, IEscrow, ERC20Base {
  uint32 private _totalProduct = 0; 
  uint256[] public registeredProducts;  
  uint256[] public tokenDepositedProducts; 
  enum State {NULL, SALE, RESERVED, SOLD}

  struct Product {
    uint32 productId;
    uint256 price;
    uint32 sellerId;
    address sellerAddress;
    State status;
  } 
  mapping(uint256 => Product) products;

  struct EscrowData {
    uint32 productId;
    uint32 buyerId;
    address buyerAddress;
    uint32 sellerId;
    address sellerAddress;
    uint256 amount;
    bool isApprove;
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

  function getTotalProduct() public view virtual override returns (uint32) {
    return _totalProduct;
  }
  function increaseTotalProduct() public virtual returns(uint32) {
    return _totalProduct += 1;
  }

  //제품 등록
  function addProduct(uint32 _sellerId, uint256 _price) public virtual override returns (bool) {
    require(_price>=0, "price of the product is less than zero");
    uint32 newProductId = increaseTotalProduct();

    products[newProductId] = Product(newProductId, _price, _sellerId, msg.sender, State.SALE);

    require(products[newProductId].sellerAddress != address(0), "Faild to register product");
    return true;
  }

  function setProductStatus(Product storage _product, State _status) internal returns(bool) {
    _product.status = _status;
    return true;
  }


  //제품 삭제
  //제품 수정


  //구매(토큰 예치), 에스크로 기능 실행, msg.sender = 구매자
  function purchaseAmountDeposit(uint32 _productId, uint32 _buyerId) public virtual override returns (bool) {

    require(products[_productId].sellerAddress != address(0), "Not found product");
    Product storage product = products[_productId];

    require(balanceOf(msg.sender) >= product.price * 10**decimals(), "Not enough balance");
    createEscrow(product, _buyerId);

    setProductStatus(product, State.RESERVED);

    return true;
  }

  function createEscrow(Product storage _product, uint32 _buyerId) internal returns(bool) {
    escrows[_product.productId] = EscrowData(_product.productId, _buyerId, msg.sender, _product.sellerId, _product.sellerAddress, _product.price, false);
    EscrowData memory escrow = escrows[_product.productId];
    require(escrow.buyerAddress != address(0), "Faild to create escrow");
    emit EscrowCreate(msg.sender, _product.sellerAddress, _product.productId, _product.price * 10**decimals(), block.timestamp);

    transfer(address(this), _product.price * 10**decimals());
    emit EscrowDeposit(escrow.productId , _product.price * 10**decimals(), block.timestamp);
    return true;
  }

  //구매완료, 제품 확인
  //msg.sender = 구매자 
  function purchaseConfirmation(uint32 _productId) external virtual override returns (bool) {
    require(escrows[_productId].buyerAddress != address(0), "Not found escrow");
    EscrowData storage escrow = escrows[_productId];

    require(balanceOf(address(this)) >= escrow.amount, "Not enough balance of contract");
    confirmProductAndReleaseApprove(escrow);
    releaseToSeller(escrow.isApprove, escrow.sellerAddress ,escrow.amount);
    emit CompleteTransaction(escrow.productId, block.timestamp);
    delete escrows[_productId]; 
    delete products[_productId];
    return true;
  }

  function confirmProductAndReleaseApprove(EscrowData storage escrow) internal returns(bool){
    require(msg.sender == escrow.buyerAddress, "" );
    escrow.isApprove = true;
    emit ReleaseApproval(escrow.productId, block.timestamp);
    return true;
  }

  //예치 금액 릴리즈
  function releaseToSeller(bool _isApprove, address _sellerAddress, uint256 _amount) public virtual override returns(bool) {
    require(_isApprove == true, "Not approved to Release");
    _transfer(address(this), _sellerAddress, _amount*10*decimals());
    return true;
  }

  //예치 금액 반환
  function refundsToBuyer(address _buyerAddress, uint256 _amount) public virtual override returns (bool) {
    _transfer(address(this), _buyerAddress, _amount*10*decimals());
    return true;
  }

}