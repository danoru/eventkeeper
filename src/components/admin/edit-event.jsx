import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

import { DateTimePicker } from "@mui/x-date-pickers";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

async function fetchEvent(eventId) {
  const response = await fetch("/api/" + eventId);
  const data = await response.json();
  const currentEventData = data[0];
  return currentEventData;
}

function EditEvent() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [flyer, setFlyer] = useState("");
  // const [isFeatured, setIsFeatured] = useState(false);
  // const [isGuestOnly, setIsGuestOnly] = useState(false);
  const [eventData, setEventData] = useState([]);

  const router = useRouter();
  const eventId = router.query.eventId;

  useEffect(() => {
    fetchEvent(eventId)
      .then((currentEventData) => {
        setEventData(currentEventData);
      })
      .catch((error) => {
        console.error("Error fetching event IDs:", error);
      });
  }, []);

  // const toggleFeaturedEvent = () => {
  //   fetch("/api/" + eventId + "/toggleValues", {
  //     method: "PUT",
  //     body: JSON.stringify({
  //       id: eventId,
  //       isFeatured: isChecked,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // };

  // const idHandler = (e) => {
  //   setId(e.target.value);
  // };
  // const titleHandler = (e) => {
  //   setTitle(e.target.value);
  // };

  // const descriptionHandler = (e) => {
  //   setDescription(e.target.value);
  // };
  // const locationHandler = (e) => {
  //   setLocation(e.target.value);
  // };

  // const flyerHandler = (e) => {
  //   setFlyer(e.target.value);
  // };

  // const featuredHandler = (e) => {
  //   const toggleValue = e.target.checked;
  //   setIsFeatured(toggleValue);
  // };

  // const guestOnlyHandler = (e) => {
  //   const toggleValue = e.target.checked;
  //   setIsGuestOnly(toggleValue);
  // };

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
      method: "PUT",
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
    <div>
      <div>
        <h3>Current Event Information</h3>
        <FormControl
          sx={{
            m: 1,
            width: "25ch",
          }}
        >
          <InputLabel id="input-label" shrink>
            Event ID
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment"
            label="Event ID"
            value={eventData.id}
            notched
            disabled
          />
        </FormControl>
        <FormControl
          sx={{
            m: 1,
            width: "25ch",
          }}
        >
          <InputLabel id="input-label" shrink>
            Title
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment"
            label="Title"
            value={eventData.title}
            notched
            disabled
          />
        </FormControl>
        <FormControl
          sx={{
            m: 1,
            width: "25ch",
          }}
        >
          <InputLabel id="input-label" shrink>
            Description
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment"
            label="Description"
            value={eventData.description}
            notched
            disabled
          />
        </FormControl>
        <FormControl
          sx={{
            m: 1,
            width: "25ch",
          }}
        >
          <InputLabel id="input-label" shrink>
            Location
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment"
            label="Location"
            value={eventData.location}
            notched
            disabled
          />
        </FormControl>
        <FormControl
          sx={{
            m: 1,
            width: "25ch",
          }}
        >
          <InputLabel id="input-label" shrink>
            Date
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment"
            label="Date"
            value={eventData.date}
            notched
            disabled
          />
        </FormControl>
        <FormControl
          sx={{
            m: 1,
            width: "25ch",
          }}
        >
          <InputLabel id="input-label" shrink>
            Flyer
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment"
            label="Flyer"
            value={eventData.flyer}
            notched
            disabled
          />
        </FormControl>
        {/* <FormControl
        sx={{
          m: 1,
          width: "25ch",
        }}
      >
        <FormControlLabel
          label="Featured Event"
          labelPlacement="start"
          notched
                    disabled
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
          notched
                    disabled
        />
      </FormControl> */}
      </div>
      <form>
        <br />
        <Button
          variant="contained"
          type="submit"
          sx={{ margin: "10px" }}
          disabled
        >
          Submit Changes
        </Button>
      </form>
    </div>
  );
}

export default EditEvent;
