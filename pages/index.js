import * as React from "react";

import Head from "next/head";

import EventList from "../src/components/events/event-list";
import { getFeaturedEvents } from "../src/data/event-data";

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>EventKeeper</title>
        <meta
          name="description"
          content="Find and RSVP for events with friends!"
        />
      </Head>
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;
