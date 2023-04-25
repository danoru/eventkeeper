import { Fragment } from "react";
import Head from "next/head";

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

export async function getServerSideProps(context) {
  let dev = process.env.NODE_ENV !== "production";
  let { DEV_URL, PROD_URL } = process.env;

  let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/events`);
  let data = await response.json();

  return {
    props: {
      events: data,
    },
  };
}

export default EventsPage;
