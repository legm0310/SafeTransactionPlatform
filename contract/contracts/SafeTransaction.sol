// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./interface/ISafeTransaction.sol";
import "./interface/IEscrow.sol";
import "./PandaToken.sol";
import "./CommonFnWrapper.sol";

contract SafeTransaction is CommonFnWrapper, ISafeTransaction, IEscrow{
  uint256 private _totalProduct = 0; // 발급된 제품 수 
  uint256[] public registeredProducts;   // 제품 리스트
  uint256[] public tokenDepositedProducts; // 구매 진행중, 물건 확인 전 제품들 리스트
  enum State {NULL, SALE, RESERVED, COMPLETE}

  struct Product {
    uint256 productId;
    uint256 price;
    address seller;
    string flawsOrDamages;
    State status;
  }
  
  mapping(uint256 => Product) products;

  struct EscrowData {
    uint256 escrowId;
    mapping(uint=>address) buyer;
    mapping(uint=>address) seller;
    uint256 amount;
  }

  mapping (uint256 => EscrowData) escrows;

  constructor(PandaToken _token) CommonFnWrapper(_token) {   
  }

  function getTotalProduct() public view virtual override returns (uint256) {
    return _totalProduct;
  }
  function increaseTotalProduct() public virtual returns(uint256) {
    return _totalProduct += 1;
  }
  //제품 등록
  function addProduct(uint256 _amount, string memory _flaws) public virtual override returns (bool) {
    require(_amount>=0, "price of the product is less than zero");
    uint256 newProductId = increaseTotalProduct();

    products[newProductId] = Product({
      productId : newProductId,
      price : _amount,
      seller : msg.sender,
      flawsOrDamages : _flaws,
      status : State.SALE
    });

    products[newProductId] = products[newProductId];
    registeredProducts.push(newProductId);
    return true;
  }
  //제품 삭제
  //제품 수정


  //구매(토큰 예치), 에스크로 기능 실행
  function purchaseAmountDeposit(uint256 _productId) public virtual override returns (bool) {
    for (uint i = 0; i < registeredProducts.length; i++) {
      if (registeredProducts[i] == _productId) {
        registeredProducts[i] = registeredProducts[registeredProducts.length-1];
        registeredProducts.pop();
        // _token.transferFrom(productSellers[_productId], msg.sender, productPrices[_productId]*uint(10)**token.decimals());
        return true;
      }
    }
    return false;
  }

  //구매완료, 제품 확인
  function purchaseConfirmation() public virtual override returns (bool) {
    return true;
  }

  //예치 금액 릴리즈
  function release() public virtual override returns(bool) {
    return true;
  }

  function refund() public virtual override returns (bool) {
    return true;
  }
}