import Link from "next/link";

import classes from "./header.module.css";

function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">EventKeeper</Link>
      </div>
    </header>
  );
}

export default Header;
