import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StyledButton, StyledTextField } from "../MUIComp";
import { Stack, Alert, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material/";
import Img from "../images/login.jpg";
import axios from "axios";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogInSuccess = () => {
    navigate("/todolist");
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    setError("");
    if (email === "" || password === "") {
      setError("Fill all the details.");
    } else {
      if (password.length <= 5) {
        setError("Password must have atleast 6 characters.");
        setPassword("");
      } else {
        // login
        try {
          const response = await axios.post("/api/users/login", {
            email,
            password,
          });
          const token = response.data.token;
          console.log(token);
          if (token) {
            handleLogInSuccess();
          }
        } catch (error) {
          console.log(error);
        }
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
        <form onSubmit={handleLogIn}>
          <Stack sx={{ width: "100%" }} spacing={6}>
            <StyledTextField
              type="email"
              className="textfield"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <StyledTextField
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
          <StyledButton type="submit" variant="contained">
            Log In
          </StyledButton>
        </form>
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
