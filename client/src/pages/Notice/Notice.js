import React, { Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import Notice_1 from "../../components/notice/Notice_1";
import Notice_2 from "../../components/notice/Notice_2";
import Notice_3 from "../../components/notice/Notice_3";
import Notice_4 from "../../components/notice/Notice_4";
import Notice_5 from "../../components/notice/Notice_5";
import Notice_6 from "../../components/notice/Notice_6";

import classes from "../../styles/notice/Notice.module.css";

const Notice = (props) => {
  let { id } = useParams();

  let notice;
  switch (id) {
    case "1":
      notice = <Notice_1 />;
      break;
    case "2":
      notice = <Notice_2 />;
      break;
    case "3":
      notice = <Notice_3 />;
      break;
    case "4":
      notice = <Notice_4 />;
      break;
    case "5":
      notice = <Notice_5 />;
      break;
    case "6":
      notice = <Notice_6 />;
      break;
    default:
      break;
  }

  return (
    <Fragment>
      <div className={classes.NoticeWrap}>
        <Link to="/">
          <button>홈으로</button>
        </Link>
        {notice}
      </div>
    </Fragment>
  );
};

export default Notice;
