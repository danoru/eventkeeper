import moment from "moment";
import Image from "next/image";

import classes from "./event-item.module.css";

import Button from "../ui/button";

interface Props {
  date: Date;
  id: string;
  image: string;
  location: string;
  title: string;
}

function EventItem({id, title, location, date, image }: Props) {
  const humanReadableDate = moment(date).format(
    "dddd, MMMM Do YYYY [at] h:mm A"
  );
  const formattedAddress = location.replace("--", "\n");
  const exploreLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      <Image priority src={image} alt={title} width={250} height={160} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}></span>
          </Button>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
