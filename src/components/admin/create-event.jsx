import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DatePicker from "@mui/x-date-pickers/DatePicker";

import { useState } from "react";

function CreateEvent() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [flyer, setFlyer] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isGuestOnly, setIsGuestOnly] = useState(false);

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
  const dateHandler = (e) => {
    setDate(e.target.value);
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
        />
      </FormControl>
      <FormControl
        sx={{
          m: 1,
          width: "25ch",
        }}
      >
        <InputLabel id="input-label">Date</InputLabel>
        <OutlinedInput
          id="outlined-adornment"
          onChange={dateHandler}
          label="Date"
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
