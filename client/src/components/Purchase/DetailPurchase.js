import { Fragment } from "react";
import { useParams } from "react-router-dom";
import classes from "./DetailPurchase.module.css";

const DetailPurchase = (props) => {
  let { id } = useParams();

  let findProduct = props.purchaseList.find((product) => {
    return product.id == id;
  });

  return (
    <Fragment>
      <section>
        <div className={classes.productContentWrap}>
          <div className={classes.ImgWrap}>
            <img src={findProduct.imgFIle} alt="" />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default DetailPurchase;
