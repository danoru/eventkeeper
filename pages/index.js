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

export async function getServerSideProps(context) {
  let dev = process.env.NODE_ENV !== "production";
  let { DEV_URL, PROD_URL } = process.env;

  let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/events/featured`);
  let data = await response.json();

  return {
    props: {
      events: data,
    },
  };
}

export default HomePage;
