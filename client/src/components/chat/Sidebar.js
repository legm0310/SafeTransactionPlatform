import React, { Fragment } from "react";
import classes from "../../styles/chat/Chat.module.css";
import Search from "./Search";
import Chats from "./Chats";

const Sidebar = () => {
  return (
    <Fragment>
      <div className={classes.sidebarWrap}>
        <Search />
        <Chats />
      </div>
    </Fragment>
  );
};

export default Sidebar;
