import { Fragment } from "react";
import Head from "next/head";
import Image from "next/image";

// import AttendanceRegistration from "../components/input/attendance-registration";
import { getFeaturedEvents, getEventById } from "../../data/event-data";
import EventRSVPList from "../../components/lists/event-rsvp-list";
import NewItem from "../../components/input/new-item";

function EventDetailPage(props) {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>EventKeeper: {event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      {/* <AttendanceRegistration /> */}
      <div>
        <h1>Cody's Corner Halloween Party!</h1>
        <h2>Saturday, October 22nd, 2022</h2>
      </div>
      <Image src={event.flyer} width="450" height="450" />
      <NewItem />
      <EventRSVPList />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default EventDetailPage;
