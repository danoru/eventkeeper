import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";

import { ItemDetail } from "../../types";

interface Props {
  items: ItemDetail[];
}

function GuestList({ items }: Props) {
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

  const rsvpListAdjusted = items
    .filter(
      (item) =>
        item.itemEntry.itemType === "guest-name" &&
        item.itemEntry.eventId === eventId
    )
    .map((item: any) => {
      const names = item.itemEntry.item
        .split(/[+,&]/)
        .map((name: string) => name.trim())
        .filter(Boolean);
      return {
        id: item._id,
        names,
      };
    });

  const guestCount = rsvpListAdjusted.reduce((total, item) => total + item.names.length, 0);

  return (
    <Grid item xs={6} sm={4} md={1}>
      <h3>Guest List ({guestCount})</h3>
      <div>
        <ul>{rsvpList}</ul>
      </div>
    </Grid>
  );
};

export default GuestList;