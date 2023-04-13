import { Fragment } from "react";
import Head from "next/head";
import Image from "next/image";
import moment from "moment";

// import AttendanceRegistration from "../components/input/attendance-registration";
import { getFeaturedEvents, getEventById } from "../../src/data/event-data";
import EventRSVPList from "../../src/components/lists/event-rsvp-list";
import NewItem from "../../src/components/input/new-item";

function EventDetailPage(props) {
  const event = props.selectedEvent;
  const pageTitle = "EventKeeper: " + event.title;

  const humanReadableDate = moment(event.date).format("dddd, MMMM Do YYYY");

  const timeUntilDate = moment(event.date)
    .startOf("MMMM Do YYYY, h:mm:ss a")
    .fromNow();

  const checkTense = () => {
    if (moment(event.date).isSameOrAfter()) {
      return "is " + timeUntilDate;
    } else if (moment(event.date).isBefore()) {
      return "was " + timeUntilDate;
    }
  };

  const checkRSVP = () => {
    if (moment(event.date).isSameOrAfter()) {
      return <NewItem {...props} />;
    } else if (moment(event.date).isBefore()) {
      return;
    }
  };

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
        <title>{pageTitle}</title>
        <meta name="description" content={event.description} />
      </Head>
      {/* <AttendanceRegistration /> */}
      <div>
        <h1>{event.title}</h1>
        <h2>{humanReadableDate}</h2>
        <h3>This event {checkTense()}.</h3>
      </div>
      <Image src={event.flyer} width="450" height="450" />
      {checkRSVP()}
      <EventRSVPList {...props} />
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
