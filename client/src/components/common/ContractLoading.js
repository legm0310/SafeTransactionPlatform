import { AlertTitle } from "@mui/material";
import { Fragment } from "react";
import { ThreeCircles, Discuss } from "react-loader-spinner";
const ContractLoading = () => {
  return (
    <Fragment>
      <AlertTitle />
      <div>
        <div>
          {/* <ThreeCircles
            height="100"
            width="100"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor="#618DFF"
            innerCircleColor="#FE4E62"
            middleCircleColor="#1ECFBA"
          /> */}

          <Discuss
            visible={true}
            height="80"
            width="80"
            ariaLabel="comment-loading"
            wrapperStyle={{ Color: "#1ECFBA" }}
            wrapperClass="comment-wrapper"
            color="#fff"
            backgroundColor="#1ECFBA"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ContractLoading;
