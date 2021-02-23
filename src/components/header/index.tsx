import React from "react";
import headerStyles from "./index.scss";

export function Header() {
  return (
    <header className={headerStyles.header}>
      <h1>Users</h1>
    </header>
  );
}

export default React.memo(Header);
