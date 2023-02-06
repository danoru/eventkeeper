import { getEventById } from "../../data/event-data";

function GuestList(props) {
  const { items } = props;

  return (
    <div>
      <h3>Guest List</h3>
      <div>
        <ul>
          {items
            ?.filter(
              (item) =>
                item.itemEntry.itemType === "guest-name" &&
                item.itemEntry.id === { eventId }
            )
            .map((item) => (
              <li key={item._id}>
                <p>{item.itemEntry.item}</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default GuestList;

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
