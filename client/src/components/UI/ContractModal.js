import { Fragment } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import ContractLoading from "./ContractLoading";
import classes from "../../styles/ContractModal.module.css";

const ModalContent = () => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>
        <h3>Smart Contract</h3>
        <h3>Interaction</h3>

        <ContractLoading />
        <div className={classes.loadingText}>
          <p>블록체인에 데이터를</p>
          <p>기록하는 중입니다.</p>
          {/* <span>.</span>
          <span>.</span>
          <span>.</span> */}
        </div>
      </div>
    </div>
  );
};

const ContractModal = () => {
  const isContractLoading = useSelector((state) => state.ui.isContractLoading);
  return (
    <Fragment>
      {isContractLoading &&
        ReactDOM.createPortal(<ModalContent></ModalContent>, document.body)}
    </Fragment>
  );
};

export default ContractModal;
