import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";

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
  const [eventData, setEventData] = useState([]);
  const [eventDetailType, setEventDetailType] = useState("");
  const [eventDetailItem, setEventDetailItem] = useState("");

  const router = useRouter();
  const eventId = router.query.eventId;

  const keyHandler = (e) => {
    setEventDetailType(e.target.value);
  };

  const valueHandler = (e) => {
    if (eventDetailType === "date") {
      {
        (newDate) => setEventDetailitem(newDate);
      }
    } else {
      setEventDetailItem(e.target.value);
    }
  };

  const dynamicEventElement =
    eventDetailType === "date" ? (
      <FormControl
        sx={{
          m: 1,
          width: "25ch",
        }}
      >
        <DateTimePicker
          disablePast
          label="Date"
          onChange={valueHandler}
          slotProps={{
            textField: {
              readOnly: true,
            },
          }}
        />
      </FormControl>
    ) : (
      <FormControl
        sx={{
          m: 1,
          width: "25ch",
        }}
      >
        <InputLabel id="input-label">Value</InputLabel>
        <OutlinedInput
          id="outlined-adornment"
          label={eventDetailItem}
          onChange={valueHandler}
        />
      </FormControl>
    );

  useEffect(() => {
    fetchEvent(eventId)
      .then((currentEventData) => {
        setEventData(currentEventData);
      })
      .catch((error) => {
        console.error("Error fetching event IDs:", error);
      });
  }, []);

  const submitFormHandler = (e) => {
    e.preventDefault();

    const form = document.querySelector("form");

    const reqBody = {
      updateEventId: eventId,
      updateEventKey: eventDetailType,
      updateEventValue: eventDetailItem,
    };

    fetch("/api/" + eventId, {
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
      </div>
      <br />
      <h3>Edit Event Details</h3>
      <form onSubmit={submitFormHandler}>
        <FormControl
          sx={{
            m: 1,
            width: "25ch",
          }}
          variant="outlined"
        >
          <InputLabel id="select-label">Key</InputLabel>
          <Select
            htmlFor="item-type"
            id="item-type"
            label="Type"
            onChange={keyHandler}
            value={eventDetailType}
          >
            <MenuItem value="title" id="title">
              Title
            </MenuItem>
            <MenuItem value="description" id="description">
              Description
            </MenuItem>
            <MenuItem value="location" id="location">
              Location
            </MenuItem>
            <MenuItem value="date" id="date">
              Date
            </MenuItem>
            <MenuItem value="flyer" id="flyer">
              Flyer
            </MenuItem>
          </Select>
        </FormControl>
        {dynamicEventElement}
        <Button
          sx={{
            m: 1,
            width: "25ch",
            height: "7ch",
          }}
          variant="contained"
          type="submit"
        >
          Submit Changes
        </Button>
      </form>
    </div>
  );
}

export default EditEvent;
