import * as React from "react";
import Head from "next/head";

import EventList from "../src/components/events/event-list";
import { EventInformation } from "../src/types";

interface Props {
  events: EventInformation[]
}

function HomePage({events}: Props) {
    return (
    <div>
      <Head>
        <title>Cody's Corner</title>
        <meta
          name="description"
          content="Find and RSVP for events with friends!"
        />
      </Head>
      <EventList items={events} />
    </div>
  );
}

export async function getServerSideProps() {
  const dev = process.env.NODE_ENV !== "production";
  const { DEV_URL, PROD_URL } = process.env;

  const response = await fetch(
    `${dev ? DEV_URL : PROD_URL}/api/events/featured`
  );
  const data = await response.json();

  return {
    props: {
      events: data,
    },
  };
}

export default HomePage;
