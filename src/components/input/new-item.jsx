import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useRouter } from "next/router";
import { useState } from "react";

function NewItem(props) {
  const { eventId, updateItems, data } = props;
  const router = useRouter();

  const [item, setItem] = useState("");
  const [itemType, setItemType] = useState("");

  const dynamicItemType = itemType === "guest-name" ? "Guest" : "Item";

  const selectionHandler = (e) => {
    setItemType(e.target.value);
  };

  const itemHandler = (e) => {
    setItem(e.target.value);
  };

  const rsvp = data[0].isGuestOnly;

  const checkGuestOnly = () => {
    if (rsvp) {
      return (
        <FormControl
          sx={{
            m: 1,
            width: "25ch",
          }}
          variant="outlined"
        >
          <InputLabel id="select-label">Type</InputLabel>
          <Select
            htmlFor="item-type"
            id="item-type"
            label="Type"
            onChange={selectionHandler}
            value={itemType}
          >
            <MenuItem value="guest-name" id="guest-name">
              Guest Name
            </MenuItem>
          </Select>
        </FormControl>
      );
    } else {
      return (
        <FormControl
          sx={{
            m: 1,
            width: "25ch",
          }}
          variant="outlined"
        >
          <InputLabel id="select-label">Type</InputLabel>
          <Select
            htmlFor="item-type"
            id="item-type"
            label="Type"
            onChange={selectionHandler}
            value={itemType}
          >
            <MenuItem value="guest-name" id="guest-name">
              Guest Name
            </MenuItem>
            <MenuItem value="main-dish" id="main-dish">
              Main Dish
            </MenuItem>
            <MenuItem value="side-dish" id="side-dish">
              Side Dish
            </MenuItem>
            <MenuItem value="snack" id="snack">
              Snack
            </MenuItem>
            <MenuItem value="dessert" id="dessert">
              Dessert
            </MenuItem>
            <MenuItem value="drink" id="drink">
              Drink
            </MenuItem>
          </Select>
        </FormControl>
      );
    }
  };

  function submitFormHandler(e) {
    e.preventDefault();

    const enteredEventId = router.query.eventId;
    const enteredItem = item;
    const enteredItemType = itemType;
    const form = document.querySelector("form");

    const reqBody = {
      eventId: enteredEventId,
      item: enteredItem,
      itemType: enteredItemType,
    };

    fetch("/api/" + eventId + "/rsvp", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    updateItems(reqBody);
    form.reset();
  }

  return (
    <div>
      <form onSubmit={submitFormHandler}>
        {checkGuestOnly()}
        <FormControl
          sx={{
            m: 1,
            width: "25ch",
          }}
        >
          <InputLabel id="input-label">{dynamicItemType}</InputLabel>
          <OutlinedInput
            id="outlined-adornment"
            label={dynamicItemType}
            onChange={itemHandler}
          />
        </FormControl>
        <Button
          sx={{
            m: 1,
            width: "25ch",
            height: "7ch",
          }}
          variant="contained"
          type="submit"
        >
          Add {dynamicItemType}
        </Button>
      </form>
    </div>
  );
}

export default NewItem;
