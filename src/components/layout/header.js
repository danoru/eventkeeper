import Link from "next/link";
import { useRouter } from "next/router";

import AdminMenu from "./admin-menu";
import classes from "./header.module.css";

function Header() {
  const toggleAdmin = () => {
    const router = useRouter();
    const eventId = router.query.eventId;

    if (eventId) {
      return (
        <li>
          <AdminMenu />
        </li>
      );
    } else {
      return;
    }
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">EventKeeper</Link>
        <div style={{ padding: "0 15px", fontSize: "1rem" }}>
          <Link href="/events">Browse All Events</Link>
        </div>
      </div>
      <nav className={classes.navigation}>
        <ul>{toggleAdmin()}</ul>
      </nav>
    </header>
  );
}

export default Header;
