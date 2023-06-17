import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function GuestOnlyToggle(props) {
  const router = useRouter();
  const eventId = router.query.eventId;

  // const [adminData, setAdminData] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    fetch("/api/" + eventId, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        // setAdminData(data);
        setIsChecked(data?.[0]?.isGuestOnly);
      });
  }, []);

  const toggleGuestOnly = () => {
    fetch("/api/" + eventId + "/toggleGuestOnly", {
      method: "PUT",
      body: JSON.stringify({
        // id: eventId,
        isGuestOnly: isChecked,
      }),
      headers: {
        "Content-Type": "applicaton/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const switchHandler = (e) => {
    const toggleValue = e.target.checked;
    setIsChecked(toggleValue);
    toggleGuestOnly(toggleValue);
  };

  return (
    <FormGroup>
      <FormControlLabel
        label="Guest Only"
        labelPlacement="start"
        control={
          <Switch disabled checked={isChecked} onClick={switchHandler} />
        }
        sx={{ margin: "auto" }}
      />
    </FormGroup>
  );
}

export default GuestOnlyToggle;
