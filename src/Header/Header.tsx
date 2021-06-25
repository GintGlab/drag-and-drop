import { observer } from "mobx-react-lite";
import React from "react";

import { ReactComponent as TrelloLogo } from "../svg/TrelloLogo.svg";
import { ReactComponent as Boards } from "../svg/Boards.svg";

const Header = observer(() => {
  return (
    <div className="header">
      <div className="trelloLogo">
        <TrelloLogo />
      </div>
      <div className="verticalBorder" />
      <div className="boardsBlock">
        <Boards />
        <div className="boardsBlock_text">Boards</div>
      </div>
      <div className="verticalBorder" />
      <input className="searchInput" />
    </div>
  );
});

export default Header;
