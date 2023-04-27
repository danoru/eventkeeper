import { useState, useEffect } from "react";

import DessertList from "./dessert-list";
import DrinkList from "./drink-list";
import MainDishList from "./main-dish-list";
import GuestList from "./guest-list";
import SideDishList from "./side-dish-list";
import SnackList from "./snack-list";
import classes from "./event-rsvp-list.module.css";

function EventRSVPList(props) {
  const { eventId } = props;
  const [showItems, setShowItems] = useState(true);
  const [items, setItems] = useState([]);
  const rsvp = props.data.isGuestOnly;

  const checkGuestOnly = () => {
    if (rsvp) {
      return (
        <div className={classes.listContainer}>
          {showItems && <GuestList items={items} />}
        </div>
      );
    } else {
      return (
        <div className={classes.listContainer}>
          {showItems && <MainDishList items={items} />}
          {showItems && <SideDishList items={items} />}
          {showItems && <SnackList items={items} />}
          {showItems && <DessertList items={items} />}
          {showItems && <DrinkList items={items} />}
          {showItems && <GuestList items={items} />}
        </div>
      );
    }
  };

  useEffect(() => {
    if (showItems) {
      fetch("/api/" + eventId + "/rsvp")
        .then((response) => response.json())
        .then((data) => {
          setItems(data.attendance);
        });
    }
  }, [showItems]);

  return <div>{checkGuestOnly()}</div>;
}

export default EventRSVPList;
