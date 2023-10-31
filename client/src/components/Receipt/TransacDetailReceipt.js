import { Fragment, useState } from "react";

import classes from "../../styles/receipt/TransactionDetailReceipt.module.css";

const TransacDetailReceipt = (props) => {
  const tx = props.txData || undefined;
  console.log(tx);
  const date = new Date(parseInt(tx?.data?.timestamp?._hex));
  let difference =
    Date.now() - Math.floor(parseInt(tx?.data?.timestamp?._hex) * 1000);
  let seconds = Math.floor(difference / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60; // 나머지 초
  minutes = minutes % 60; // 나머지 분

  return (
    <Fragment>
      <div className={classes.receiptWrap}>
        {tx ? (
          <div>
            <div className={classes.receiptHeader}>
              [This is a Sepolia transaction only]
            </div>

            <div className={classes.receiptfirstContent}>
              <div className={classes.tHash}>
                <div className={classes.title}>Transaction Hash: </div>
                <div className={classes.value}>
                  <a
                    href={`https://sepolia.etherscan.io/tx/${tx?.transaction?.transactionHash}`}
                  >
                    {tx?.transaction?.transactionHash}
                  </a>
                </div>
              </div>

              <div className={classes.status}>
                <div className={classes.title}>Transaction Index: </div>
                <div className={classes.value}>
                  {tx?.transaction?.transactionIndex}
                </div>
              </div>
              <div className={classes.status}>
                <div className={classes.title}>Status: </div>
                <div className={classes.value}>Success</div>
              </div>

              <div className={classes.block}>
                <div className={classes.title}>Block Num: </div>
                <div className={classes.value}>
                  {tx?.transaction?.blockNumber}
                </div>
              </div>

              <div className={classes.timeStamp}>
                <div className={classes.title}>Timestamp: </div>
                <div className={classes.value}>
                  {`${hours}시간 ${minutes}분 ${seconds}초 전`}
                  <br></br>
                  {`${date}`}
                </div>
              </div>
            </div>

            <div className={classes.receiptSecondContent}>
              <div className={classes.from}>
                <div className={classes.title}>Event Name: </div>
                <div className={classes.value}>{tx?.eventName}</div>
              </div>

              <div className={classes.from}>
                <div className={classes.title}>From: </div>
                <div className={classes.value}>
                  {props.event == "EscrowDeposit"
                    ? tx?.data?.buyer
                    : tx?.transaction?.address}
                </div>
              </div>

              <div className={classes.to}>
                <div className={classes.title}>To: </div>
                <div className={classes.value}>
                  {props.event == "EscrowDeposit"
                    ? tx?.data?.buyers
                    : tx?.transaction?.address}
                  {tx?.transaction?.address}
                </div>
              </div>
            </div>
            <div className={classes.receiptThirdContent}>
              <div className={classes.tvalue}>
                <div className={classes.title}>Value: </div>
                <div className={classes.value}>0.03052356 ETH ($0.00)</div>
              </div>

              <div className={classes.tFee}>
                <div className={classes.title}>Transaction Fee: </div>
                <div className={classes.value}>0.000002100015246 ETH</div>
              </div>

              <div className={classes.gasPrice}>
                <div className={classes.title}>Gas Price: </div>
                <div className={classes.value}>0.100000726 Gwei</div>
              </div>
            </div>
            <div className={classes.receiptFurthContent}>
              <div className={classes.productNumber}>
                <div className={classes.title}>제품 번호: </div>
                <div className={classes.value}>
                  {props.event == "EscrowDeposit"
                    ? parseInt(tx?.data?.productId)
                    : parseInt(tx?.data?.escrowId)}
                </div>
              </div>

              <div className={classes.price}>
                <div className={classes.title}>가격: </div>
                <div className={classes.value}>
                  {parseInt(tx?.data?.amount)} PDT
                </div>
              </div>

              <div className={classes.sellerNumber}>
                <div className={classes.title}>구매자 지갑 주소: </div>
                <div className={classes.value}>{tx?.data?.buyer}</div>
              </div>
              <div className={classes.sellerNumber}>
                <div className={classes.title}>판매자 지갑 주소: </div>
                <div className={classes.value}>{tx?.data?.seller}</div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </Fragment>
  );
};

export default TransacDetailReceipt;
