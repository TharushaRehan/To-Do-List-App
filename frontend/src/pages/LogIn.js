import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StyledButton, StyledTextField } from "../MUIComp";
import { Stack, Alert, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material/";
import Img from "../images/login.jpg";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = () => {
    // Regex pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailPattern.test(email));
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleLogIn = async (e) => {
    e.preventDefault();
    setError("");
    if (email === "" || password === "") {
      setError("Fill all the details.");
    } else {
      validateEmail();
      if (isValid) {
        if (password.length <= 5) {
          setError("Password must have atleast 6 characters.");
          setPassword("");
        } else {
          // login
        }
      } else {
        setError("Enter a valid email address.");
      }
    }
  };
  return (
    <div className="signup-page">
      <div className="create-acc-form">
        <img
          src={Img}
          style={{ height: "200px", borderRadius: "25px", marginTop: "20px" }}
          alt="HomeImage"
        />
        <p style={{ fontSize: "30px", textAlign: "center" }}>Log In</p>
        <Stack sx={{ width: "100%" }} spacing={6}>
          <StyledTextField
            required
            type="text"
            className="textfield"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <StyledTextField
            required
            type={showPassword ? "text" : "password"}
            className="textfield"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {error && (
            <Alert variant="standard" severity="error">
              {error}
            </Alert>
          )}
        </Stack>

        <br />
        <br />
        <br />
        <br />
        <StyledButton type="submit" variant="contained" onClick={handleLogIn}>
          Log In
        </StyledButton>

        <br />
        <br />
        <Link to="/signup">
          <p
            style={{ textDecoration: "none", color: "black", fontSize: "15px" }}
          >
            New User ? Sign Up here.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default LogIn;
