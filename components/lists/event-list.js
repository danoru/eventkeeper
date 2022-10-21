import DessertList from "./dessert-list";
import DrinkList from "./drink-list";
import MainDishList from "./main-dish-list";
import RSVPList from "./rsvp-list";
import SideDishList from "./side-dish-list";
import SnackList from "./snack-list";

import classes from "./event-list.module.css";

function EventList() {
  return (
    <div className={classes.listContainer}>
      <MainDishList />
      <SideDishList />
      <SnackList />
      <DessertList />
      <DrinkList />
      <RSVPList />
    </div>
  );
}

export default EventList;