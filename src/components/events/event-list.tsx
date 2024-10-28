import EventItem from "./event-item";
import classes from "./event-list.module.css";

import { EventInformation } from "../../types";

interface Props {
items: EventInformation[]
}

function EventList({ items }: Props) {


  return (
    <ul className={classes.list}>
      {items?.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          location={event.location}
          date={event.date}
          image={event.image}
        />
      ))}
    </ul>
  );
}

export default EventList;
