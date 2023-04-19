import { useRouter } from "next/router";

function GuestList(props) {
  const { items } = props;
  const router = useRouter();

  const eventId = router.query.eventId;

  const rsvpList = items
    ?.filter(
      (item) =>
        item.itemEntry.itemType === "guest-name" &&
        item.itemEntry.eventId === eventId
    )
    .map((item) => (
      <li key={item._id}>
        <p>{item.itemEntry.item}</p>
      </li>
    ));

  let guestCount = rsvpList.length;

  return (
    <div>
      <h3>Guest List ({guestCount})</h3>
      <div>
        <ul>{rsvpList}</ul>
      </div>
    </div>
  );
}

export default GuestList;
