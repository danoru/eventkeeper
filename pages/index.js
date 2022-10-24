import Head from "next/head";

import { getFeaturedEvents } from "../data/event-data";
import EventList from "../components/events/event-list";

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
