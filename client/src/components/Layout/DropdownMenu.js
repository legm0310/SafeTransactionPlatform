import { Fragment } from "react";

import classes from "../../styles/DropdownMenu.module.css";

const DropdownMenu = () => {
  return (
    <Fragment>
      <div className={classes.dropdown}>
        <div className={classes.dropdownContent}>
          <div className={classes.dropdowPosition}>
            <p>카테고리</p>

            <ul>
              <div>
                <li>
                  <a href="#home">Link1</a>
                </li>
                <li>
                  <a href="#home">Link1</a>
                </li>
                <li>
                  <a href="#home">Link1</a>
                </li>
                <li>
                  <a href="#home">Link1</a>
                </li>
                <li>
                  <a href="#home">Link1</a>
                </li>
              </div>

              <div>
                <li>
                  <a href="#home">Link1</a>
                </li>
                <li>
                  <a href="#home">Link1</a>
                </li>
                <li>
                  <a href="#home">Link1</a>
                </li>
                <li>
                  <a href="#home">Link1</a>
                </li>
                <li>
                  <a href="#home">Link1</a>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DropdownMenu;
