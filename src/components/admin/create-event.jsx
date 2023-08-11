import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import moment from "moment";

import { DateTimePicker } from "@mui/x-date-pickers";
import { useState, useEffect } from "react";

async function fetchEventIds(userYear) {
  const response = await fetch("/api/events/");
  const data = await response.json();
  const eventIds = data
    .map((item) => item.id)
    .filter((id) => id.startsWith(userYear));
  return eventIds;
}

function CreateEvent() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [flyer, setFlyer] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isGuestOnly, setIsGuestOnly] = useState(false);
  const [userEventIds, setUserEventIds] = useState([]);

  const user = "sparks";
  const currentYear = moment().format("YY");
  const userYear = user + currentYear;

  useEffect(() => {
    fetchEventIds(userYear)
      .then((eventIds) => {
        setUserEventIds(eventIds);
      })
      .catch((error) => {
        console.error("Error fetching event IDs:", error);
      });
  }, []);

  let incrementalNumber = userEventIds.length + 1;
  const number = incrementalNumber.toString().padStart(2, "0");
  const newEventId = userYear + number;

  const idHandler = (e) => {
    setId(e.target.value);
  };
  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };
  const locationHandler = (e) => {
    setLocation(e.target.value);
  };

  const flyerHandler = (e) => {
    setFlyer(e.target.value);
  };

  const featuredHandler = (e) => {
    const toggleValue = e.target.checked;
    setIsFeatured(toggleValue);
  };

  const guestOnlyHandler = (e) => {
    const toggleValue = e.target.checked;
    setIsGuestOnly(toggleValue);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    const form = document.querySelector("form");

    const reqBody = {
      id: id,
      title: title,
      description: description,
      location: location,
      date: date,
      image: flyer,
      flyer: flyer,
      isFeatured: isFeatured,
      isGuestOnly: isGuestOnly,
    };

    fetch("/api/" + id, {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    form.reset();
  };

  return (
    <form onSubmit={submitFormHandler}>
      <FormControl
        sx={{
          m: 1,
          width: "25ch",
        }}
      >
        <InputLabel id="input-label">Event ID</InputLabel>
        <OutlinedInput
          id="outlined-adornment"
          onChange={idHandler}
          label="Event ID"
          value={newEventId}
          disabled
        />
      </FormControl>
      <FormControl
        sx={{
          m: 1,
          width: "25ch",
        }}
      >
        <InputLabel id="input-label">Title</InputLabel>
        <OutlinedInput
          id="outlined-adornment"
          onChange={titleHandler}
          label="Title"
          required
        />
      </FormControl>
      <FormControl
        sx={{
          m: 1,
          width: "25ch",
        }}
      >
        <InputLabel id="input-label">Description</InputLabel>
        <OutlinedInput
          id="outlined-adornment"
          onChange={descriptionHandler}
          label="Description"
          required
        />
      </FormControl>
      <FormControl
        sx={{
          m: 1,
          width: "25ch",
        }}
      >
        <InputLabel id="input-label">Location</InputLabel>
        <OutlinedInput
          id="outlined-adornment"
          onChange={locationHandler}
          label="Location"
          required
        />
      </FormControl>
      <FormControl
        sx={{
          m: 1,
          width: "25ch",
        }}
      >
        <DateTimePicker
          disablePast
          label="Date"
          onChange={(newDate) => setDate(newDate)}
          slotProps={{
            textField: {
              readOnly: true,
            },
          }}
        />
      </FormControl>
      <FormControl
        sx={{
          m: 1,
          width: "25ch",
        }}
      >
        <InputLabel id="input-label">Flyer</InputLabel>
        <OutlinedInput
          id="outlined-adornment"
          onChange={flyerHandler}
          label="Flyer"
          required
        />
      </FormControl>
      <FormControl
        sx={{
          m: 1,
          width: "25ch",
        }}
      >
        <FormControlLabel
          label="Featured Event"
          labelPlacement="start"
          control={<Switch onChange={featuredHandler} />}
        />
      </FormControl>
      <FormControl
        sx={{
          m: 1,
          width: "25ch",
        }}
      >
        <FormControlLabel
          label="Guest Only"
          labelPlacement="start"
          control={<Switch onChange={guestOnlyHandler} />}
        />
      </FormControl>
      <br />
      <Button variant="contained" type="submit" sx={{ margin: "10px" }}>
        Create New Event
      </Button>
    </form>
  );
}

export default CreateEvent;
