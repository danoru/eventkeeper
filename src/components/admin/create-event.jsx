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

  const selectionHandler = (e) => {
    setItemType(e.target.value);
  };

  const itemHandler = (e) => {
    setItem(e.target.value);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

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

    // fetch("/api/" + id + "/rsvp", {
    //   method: "POST",
    //   body: JSON.stringify(reqBody),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
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
          onChange={itemHandler}
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
          onChange={itemHandler}
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
          onChange={itemHandler}
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
          label="Location"
          onChange={itemHandler}
        />
      </FormControl>
      <FormControl
        sx={{
          m: 1,
          width: "25ch",
        }}
      >
        DatePicker
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
          onChange={itemHandler}
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
          control={<Switch />}
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
          control={<Switch />}
        />
      </FormControl>
      <br />
      <Button
        disabled
        variant="contained"
        type="submit"
        sx={{ margin: "10px" }}
      >
        Create New Event
      </Button>
    </form>
  );
}

export default CreateEvent;
