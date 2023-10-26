import { Fragment } from "react";

import classes from "../../styles/receipt/TransactionDetailReceipt.module.css";

const TransacDetailReceipt = () => {
  return (
    <Fragment>
      <div className={classes.receiptWrap}>
        <div className={classes.receiptHeader}>
          [This is a Sepolia transaction only]
        </div>

        <div className={classes.receiptfirstContent}>
          <div className={classes.tHash}>
            <div className={classes.title}>Transaction Hash: </div>
            <div className={classes.value}>
              0xa36b1fa04ce681526c8bc035496f5d9fbea60415e652819bf2a790704271176a
            </div>
          </div>

          <div className={classes.status}>
            <div className={classes.title}>Status: </div>
            <div className={classes.value}>Success</div>
          </div>

          <div className={classes.block}>
            <div className={classes.title}>Block: </div>
            <div className={classes.value}>4448835</div>
          </div>

          <div className={classes.timeStamp}>
            <div className={classes.title}>Timestamp: </div>
            <div className={classes.value}>
              {" "}
              days 1 hr ago (Oct-08-2023 08:08:!2 AM +UTC)
            </div>
          </div>
        </div>

        <div className={classes.receiptSecondContent}>
          <div className={classes.from}>
            <div className={classes.title}>From: </div>
            <div className={classes.value}>
              0xa36b1fa04ce681526c8bc035496f5d9fbea60415e652819bf2a
            </div>
          </div>

          <div className={classes.to}>
            <div className={classes.title}>To: </div>
            <div className={classes.value}>
              0xa36b1fa04ce681526c8bc035496f5d9fbea60415e652819bf2a
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
            <div className={classes.value}>0.03052356 ETH ($0.00)</div>
          </div>

          <div className={classes.price}>
            <div className={classes.title}>가격: </div>
            <div className={classes.value}>0.000002100015246 ETH</div>
          </div>

          <div className={classes.sellerNumber}>
            <div className={classes.title}>판매자 번호: </div>
            <div className={classes.value}>0.100000726 Gwei</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TransacDetailReceipt;
