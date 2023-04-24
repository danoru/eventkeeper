import { Fragment } from "react";
import Head from "next/head";

import { getAllEvents } from "../../src/data/event-data";
import EventList from "../../src/components/events/event-list";

function EventsPage(props) {
  const { events } = props;

  return (
    <Fragment>
      <Head>
        <title>EventKeeper: All Events</title>
        <meta
          name="description"
          content="Find a lot of great events to attend with your friends!"
        />
      </Head>
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  // try {
  // await fetch("/api/getEvents")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);
  //     return data;
  //   });
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
  // } catch (e) {
  //   console.error(e);
  // }
}

export default EventsPage;
