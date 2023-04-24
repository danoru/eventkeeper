import { Fragment, useEffect, useState } from "react";
import Head from "next/head";

import EventList from "../../src/components/events/event-list";

function EventsPage(props) {
  const { events } = props;
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    if (eventList) {
      fetch("/api/getEvents")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setEventList(data.events);
        });
    }
  }, [eventList]);

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

// export async function getStaticProps() {
//   // try {

//   // useEffect(() => {
//   //   if (eventList) {
//   //     fetch("/api/getEvents")
//   //       .then((response) => response.json())
//   //       .then((data) => {
//   //         console.log(data);
//   //         setEventList(data.events);
//   //       });
//   //   }
//   // }, [showEventList]);

//   return {
//     props: {
//       events: eventData,
//     },
//     revalidate: 60,
//   };
//   // } catch (e) {
//   //   console.error(e);
//   // }
// }

export default EventsPage;
