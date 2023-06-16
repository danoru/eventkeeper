import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";

import { useRouter } from "next/router";

function GuestOnlyToggle() {
  const router = useRouter();
  const eventId = router.query.eventId;

  let [adminData, setAdminData] = useState(null);

  useEffect(() => {
    fetch("/api/" + eventId, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setAdminData(data);
      });
  }, []);

  const isGuestOnly = adminData?.map((adminData) => adminData.isGuestOnly);
  const [isFlagged, setisFlagged] = useState(isGuestOnly);

  const toggleGuestOnly = () => {
    fetch("/api/" + eventId + "/toggleGuestOnly", {
      method: "POST",
      body: JSON.stringify({
        id: eventId,
        isGuestOnly: isFlagged,
      }),
      headers: {
        "Content-Type": "applicaton/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    setisFlagged(!isFlagged);
    console.log([isFlagged]);
  };

  return (
    <FormGroup>
      <FormControlLabel
        label="Guest Only"
        labelPlacement="start"
        control={
          <Switch disabled checked={isFlagged} onChange={toggleGuestOnly} />
        }
        sx={{ margin: "auto" }}
      />
    </FormGroup>
  );
}

export default GuestOnlyToggle;
