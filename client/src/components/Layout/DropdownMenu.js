import { Fragment } from "react";
import classes from "./DropdownMenu.module.css";

const DropdownMenu = () => {
  return (
    <Fragment>
      <div className={classes.dropdown}>
        <div className={classes.dropdownContent}>
          <div className={classes.dropdowPosition}>
            <p>카테고리</p>
            <ul>
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
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DropdownMenu;
