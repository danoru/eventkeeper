import { useRouter } from "next/router";

function GuestList(props: any) {
  const { items } = props;
  const router = useRouter();

  const eventId = router.query.eventId;

  const rsvpList = items
    ?.filter(
      (item: any) =>
        item.itemEntry.itemType === "guest-name" &&
        item.itemEntry.eventId === eventId
    )
    .map((item: any) => (
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
