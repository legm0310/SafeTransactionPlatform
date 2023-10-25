import React, { Fragment } from "react";
import { useState } from "react";
import Search from "./Search";
import Chats from "./Chats";

import classes from "../../styles/chat/Chat.module.css";

const Sidebar = () => {
  const [searchRoomName, setSearchRoomName] = useState("");
  return (
    <Fragment>
      <div className={classes.sidebarWrap}>
        <Search
          searchRoomName={searchRoomName}
          setSearchRoomName={setSearchRoomName}
        />
        <Chats searchRoomName={searchRoomName} />
      </div>
    </Fragment>
  );
};

export default Sidebar;
