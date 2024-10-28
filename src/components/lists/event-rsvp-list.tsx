import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import DessertList from "./dessert-list";
import DrinkList from "./drink-list";
import GuestList from "./guest-list";
import MainDishList from "./main-dish-list";
import SideDishList from "./side-dish-list";
import SnackList from "./snack-list";
import SuppliesList from "./supplies-list";
import { EventInformation, ItemEntry } from "../../../src/types/index";

interface EventRSVPListProps {
  event: EventInformation;
  items: ItemEntry[];
  setItems: ItemEntry[];
}

function EventRSVPList({ event, items, setItems }: EventRSVPListProps) {
  const router = useRouter();
  const eventId = router.query.eventId as string; // Ensure eventId is a string
  const [showItems, setShowItems] = useState(true);
  const isGuestOnly = event?.isGuestOnly;

  useEffect(() => {
    if (showItems && eventId) {
      fetch(`/api/${eventId}/rsvp`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setItems(data.attendance || []); // Fallback to an empty array
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    }
  }, [showItems, eventId, setItems]);

  const renderItems = () => {
    if (isGuestOnly) {
      return (
        <Grid container spacing={2} justifyContent="center">
          {showItems && <GuestList items={items} />}
        </Grid>
      );
    }

    return (
      <Grid container spacing={2} justifyContent="space-around">
        {showItems && <GuestList items={items} />}
        {showItems && <MainDishList items={items} />}
        {showItems && <SideDishList items={items} />}
        {showItems && <SnackList items={items} />}
        {showItems && <DessertList items={items} />}
        {showItems && <DrinkList items={items} />}
        {showItems && <SuppliesList items={items} />}
      </Grid>
    );
  };

  return <div>{renderItems()}</div>;
}

export default EventRSVPList;