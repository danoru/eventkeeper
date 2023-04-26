import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { useRouter } from "next/router";

function AdminMenu() {
  const router = useRouter();
  const eventId = router.query.eventId;

  let [adminData, setAdminData] = useState(null);

  useEffect(() => {
    console.log("If it works, this should be shown!");
    fetch("/api/" + eventId)
      .then((response) => response.json())
      .then((data) => {
        setAdminData(data);
        console.log(adminData);
      });
  }, []);

  const isGuestOnly = adminData?.map((adminData) => adminData.isGuestOnly);

  const [anchorElAdmin, setAnchorElAdmin] = React.useState(null);

  const handleOpenAdminMenu = (event) => {
    setAnchorElAdmin(event.currentTarget);
  };

  const handleCloseAdminMenu = () => {
    setAnchorElAdmin(null);
  };

  let guestOnlyStatus = "Guest Only: " + isGuestOnlyHumanReadable;

  const toggleGuestOnly = () => {};

  const settings = [
    { id: 1, title: guestOnlyStatus, onClick: toggleGuestOnly() },
  ];

  return (
    <Box>
      <Tooltip title="Admin Controls">
        <IconButton onClick={handleOpenAdminMenu} sx={{ p: 0 }}>
          <Avatar alt="Admin" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px", textDecoration: "none" }}
        id="menu-appbar"
        anchorEl={anchorElAdmin}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElAdmin)}
        onClose={handleCloseAdminMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting.id} onClick={handleCloseAdminMenu}>
            <Typography textAlign="center">
              <p onClick={setting.onClick}>{setting.title}</p>
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default AdminMenu;
