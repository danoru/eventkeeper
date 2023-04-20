import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

function AdminMenu() {
  const [anchorElAdmin, setAnchorElAdmin] = React.useState(null);

  const handleOpenAdminMenu = (event) => {
    setAnchorElAdmin(event.currentTarget);
  };

  const handleCloseAdminMenu = () => {
    setAnchorElAdmin(null);
  };

  let guestOnlyStatus = "Guest Only: True";

  const toggleGuestOnly = () => {};

  const settings = [
    { id: 1, title: guestOnlyStatus, onClick: toggleGuestOnly() },
  ];

  return (
    <Box>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenAdminMenu} sx={{ p: 0 }}>
          <Avatar alt="Admin" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
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
