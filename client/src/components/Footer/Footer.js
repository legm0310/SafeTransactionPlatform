import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

import { FiInstagram } from "react-icons/fi";
import classes from "../../styles/Footer/Footer.module.css";
import { useSelector } from "react-redux";
import presentation from "../../assets/presentation.pdf";

const Footer = () => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <Fragment>
      {isLoading ? null : (
        <footer className={classes.footerWrap}>
          <div className={classes.footerContent}>
            <div className={classes.companyInfo}>
              <h1>PANDA.</h1>
              <p>
                Joongbu University 정보보호학과
                <br />
                팀명: 개발의 민족
                <br />
                호스팅서비스 제공자: Amazon Web Services(AWS), Vercel
              </p>
            </div>
            <div className={classes.social}>
              <h3>Social</h3>
              <ul className={classes.socialList}>
                <li>
                  <a
                    href="https://www.instagram.com/9_miin/"
                    target="_blank"
                    className={classes.listContent}
                  >
                    <FiInstagram className={classes["instagramImg"]} />
                    이규민
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/ho_onii_/"
                    target="_blank"
                    className={classes.listContent}
                  >
                    <FiInstagram className={classes["instagramImg"]} />
                    이승훈
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/woo.__.sang/"
                    target="_blank"
                    className={classes.listContent}
                  >
                    <FiInstagram className={classes["instagramImg"]} />
                    성우상
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/im_jun0_/"
                    target="_blank"
                    className={classes.listContent}
                  >
                    <FiInstagram className={classes["instagramImg"]} />
                    전준영
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/ldhokrj/"
                    target="_blank"
                    className={classes.listContent}
                  >
                    <FiInstagram className={classes["instagramImg"]} />
                    최병준
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/junhyeon_e/"
                    target="_blank"
                    className={classes.listContent}
                  >
                    <FiInstagram className={classes["instagramImg"]} />
                    김준현
                  </a>
                </li>
              </ul>
            </div>
            <div className={classes.information}>
              <h3>Information</h3>
              <ul className={classes.infoList}>
                <Link to="/manual">
                  <li>판다 메뉴얼</li>
                </Link>
                <li>
                  <a
                    href={presentation}
                    target="_blank"
                    className={classes.listContent}
                  >
                    발표 자료
                  </a>
                </li>
              </ul>
            </div>
            <div className={classes.contact}>
              <h3>Contact</h3>
              <ul className={classes.contactList}>
                <li>팀: 개발의 민족</li>
                <li>email: legm0310@gmail.com</li>
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
