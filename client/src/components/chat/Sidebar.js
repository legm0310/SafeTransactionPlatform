import React, { Fragment } from "react";
import Search from "./Search";
import Chats from "./Chats";

import classes from "../../styles/chat/Chat.module.css";

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
