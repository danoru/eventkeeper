import DrinkList from "./drink-list";
import FoodList from "./food-list";
import RSVPList from "./rsvp-list";

import classes from "./event-list.module.css";

function EventList() {
  return (
    <div className={classes.list}>
      <FoodList />
      <DrinkList />
      <RSVPList />
    </div>
  );
}

export default EventList;
