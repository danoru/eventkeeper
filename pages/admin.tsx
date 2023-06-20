import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

function AdminSettings() {
  const [errorStatus, setErrorStatus] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const passwordError = errorStatus ? "Incorrect password." : "";

  const clickShowPasswordHandler = () => setShowPassword((show) => !show);

  const mouseDownPasswordHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const passwordHandler = (e: any) => {
    setPassword(e.target.value);
  };

  function submitFormHandler(e: any) {
    e.preventDefault();
    if (password === "sparks23") {
      setLoggedIn(true);
    } else {
      setErrorStatus(true);
      setPassword("");
    }
  }

  if (!loggedIn) {
    return (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <form onSubmit={submitFormHandler}>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              error={errorStatus}
              id="outlined-adornment-password"
              label="Password"
              type={showPassword ? "text" : "password"}
              onChange={passwordHandler}
              value={password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={clickShowPasswordHandler}
                    onMouseDown={mouseDownPasswordHandler}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText error id="password-error">
              {passwordError}
            </FormHelperText>
            <Button variant="contained" type="submit">
              Log In
            </Button>
          </FormControl>
        </form>
        <div>
          <Button href="/">Return to Main</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Button>Create New Event</Button>
      </div>
      <div style={{ marginTop: "15px" }}>
        <Button href="/">Return to Event</Button>
      </div>
    </div>
  );
}

export default AdminSettings;