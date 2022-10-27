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
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}

export default EventsPage;
