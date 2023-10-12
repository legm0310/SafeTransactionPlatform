import { Fragment } from "react";
import { Link } from "react-router-dom";

import { FiInstagram } from "react-icons/fi";
import classes from "../../styles/Footer/Footer.module.css";
import { useSelector } from "react-redux";

const Footer = () => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  return (
    <Fragment>
      {isLoading ? null : (
        <footer className={classes.footerWrap}>
          <div className={classes.footerContent}>
            <div className={classes.companyInfo}>
              <h2>PANDA</h2>
              <p>
                Joongbu University 정보보호학과
                <br />
                팀명: 개발놈들
                <br />
                호스팅서비스 제공자: Amazon Web Services(AWS), Vercel
              </p>
            </div>
            <div className={classes.social}>
              <h3>Social</h3>
              <ul className={classes.socialList}>
                <li className={classes.listContent}>
                  <FiInstagram className={classes["instagramImg"]} />
                  Instagram(이규민)
                </li>
                <li className={classes.listContent}>
                  <FiInstagram className={classes["instagramImg"]} />
                  Instagram(이승훈)
                </li>
                <li className={classes.listContent}>
                  <FiInstagram className={classes["instagramImg"]} />
                  Instagram(성우상)
                </li>
                <li className={classes.listContent}>
                  <FiInstagram className={classes["instagramImg"]} />
                  Instagram(전준영)
                </li>
                <li className={classes.listContent}>
                  <FiInstagram className={classes["instagramImg"]} />
                  Instagram(최병준)
                </li>
                <li className={classes.listContent}>
                  <FiInstagram className={classes["instagramImg"]} />
                  Instagram(김준현)
                </li>
              </ul>
            </div>
            <div>
              <h3>Information</h3>
              <ul className={classes.infoList}>
                <Link to="/manual">
                  <li>판다 메뉴얼</li>
                </Link>
              </ul>
            </div>
            <div>
              <h3>Contact</h3>
              <ul className={classes.contactList}>
                <li>대표: 이규민</li>
                <li>tel: 010-7763-7514</li>
              </ul>
            </div>
          </div>
          <div className={classes.footerBottom}>
            <p>
              Copyright ⓒ 2023 <span>Joongbu Univ.</span> All Rights Reserved
            </p>
          </div>
        </footer>
      )}
    </Fragment>
  );
};

export default Footer;
