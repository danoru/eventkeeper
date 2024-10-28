import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";

interface ItemEntry {
  itemType: string;
  eventId: string;
  item: string;
}

interface Item {
  _id: string;
  itemEntry: ItemEntry;
}

interface Props {
  items: Item[];
}

function GuestList({ items }: Props) {
  const router = useRouter();
  const eventId = router.query.eventId;

  const rsvpList = items
    .filter(
      (item) =>
        item.itemEntry.itemType === "guest-name" &&
        item.itemEntry.eventId === eventId
    )
    .map((item) => {
      const names = item.itemEntry.item
        .split(/[+,&]/)
        .map((name) => name.trim())
        .filter(Boolean);
      return {
        id: item._id,
        names,
      };
    });

  const guestCount = rsvpList.reduce((total, item) => total + item.names.length, 0);

  const rsvpListNames = rsvpList.map((item) => (
    <li key={item.id}>
      {item.names.map((name, index) => (
        <p key={`${item.id}-${index}`}>{name}</p>
      ))}
    </li>
  ));

  return (
    <Grid item xs={6} sm={4} md={1}>
      <h3>Guest List ({guestCount})</h3>
      <div>
        <ul>{rsvpListNames}</ul>
      </div>
    </Grid>
  );
};

export default GuestList;