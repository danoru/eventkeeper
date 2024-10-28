import Head from "next/head";
import Image from "next/image";
import moment from "moment";
import { Fragment, useState } from "react";

// import AttendanceRegistration from "../components/input/attendance-registration";
import EventRSVPList from "../../../src/components/lists/event-rsvp-list";
import HostRecommendations from "../../../src/components/admin/host-recommendations";
import NewItem from "../../../src/components/input/new-item";
import { EventInformation, ItemEntry } from "../../../src/types/index";

interface Props {
  data: EventInformation[];
}

function EventDetailPage({ data }: Props) {
  const [event] = data || [];

  if (!event) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  const [items, setItems] = useState<{ _id: string; itemEntry: ItemEntry }[]>([]);

  function updateItems(newItem: ItemEntry) {
    const newItemEntry = { _id: "", itemEntry: newItem };
    setItems((prevItems) => [...prevItems, newItemEntry]);
  }

  const pageTitle = `Cody's Corner: ${event.title}`;
  const formattedAddress = event.location.replace("--", " / ");
  const humanReadableDate = moment(event.date).format("dddd, MMMM Do YYYY [at] h:mm A");
  const timeUntilDate = moment(event.date).startOf("hour").fromNow();

  const checkTense = () => {
    return moment(event.date).isSameOrAfter()
      ? `is ${timeUntilDate}`
      : `was ${timeUntilDate}`;
  };

  const checkRSVP = () => {
    return moment(event.date).isSameOrAfter() ? <NewItem updateItems={updateItems} {...event} /> : null;
  };

  return (
    <Fragment>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={event.description} />
      </Head>
      {/* <AttendanceRegistration /> */}
      <div>
        <h1>{event.title}</h1>
        <h2>{formattedAddress}</h2>
        <h2>{humanReadableDate}</h2>
        <h3>This event {checkTense()}.</h3>
      </div>
      <Image src={event.flyer} width={450} height={450} alt={event.title} />
      <HostRecommendations />
      {checkRSVP()}
      <EventRSVPList items={items} setItems={setItems} {...event} />
    </Fragment>
  );
}

export async function getStaticProps({ params }: { params: { eventId: string } }) {
  const dev = process.env.NODE_ENV !== "production";
  const { DEV_URL, PROD_URL } = process.env;

  const response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/${params.eventId}`);
  const data: EventInformation[] = await response.json();

  return {
    props: {
      data,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths(props: any) {
  // const eventId = props.eventId;

  // const dev = process.env.NODE_ENV !== "production";
  // const { DEV_URL, PROD_URL } = process.env;

  // const response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/${eventId}`);
  // const data = await response.json();

  // const paths = data.map((event: any) => ({ params: { eventId: event.id } }));

  return {
    paths: [],
    fallback: "blocking",
  };
}

export default EventDetailPage;
