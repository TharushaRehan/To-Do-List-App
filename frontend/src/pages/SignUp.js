import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { StyledButton, StyledTextField } from "../MUIComp";
import { Stack, Alert, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material/";
import Img from "../images/12085707_20944201.jpg";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  //const [isValid, setIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // const validateEmail = () => {
  //   // Regex pattern for email validation
  //   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   setIsValid(emailPattern.test(email));
  // };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const HandleCreateAcc = async (e) => {
    e.preventDefault();
    setError("");
    if (email === "" || password === "" || confirmPassword === "") {
      setError("Fill all the details.");
    } else {
      //validateEmail();
      //if (isValid) {
      if (password === confirmPassword) {
        if (password.length <= 5) {
          setError("Password must have atleast 6 characters.");
          setPassword("");
          setConfirmPassword("");
        } else {
          // register
          try {
            const response = await axios.post("/api/users/register", {
              email,
              password,
            });
            const data = response.data;
            console.log(data);
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        setError("Password do not match.");
        setPassword("");
        setConfirmPassword("");
        return;
      }
      // } else {
      //   setError("Enter a valid email address.");
      // }
    }
  };
  return (
    <div className="signup-page">
      <div className="create-acc-form">
        <img
          src={Img}
          style={{ height: "400px", borderRadius: "25px", marginTop: "20px" }}
          alt="SignUpImage"
        />
        <div>
          <p style={{ fontSize: "30px", textAlign: "center" }}>
            Create Account
          </p>
          <form onSubmit={HandleCreateAcc}>
            <Stack sx={{ width: "100%" }} spacing={6}>
              <StyledTextField
                required
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

              <StyledTextField
                type={showPassword ? "text" : "password"}
                className="textfield"
                label="Confirm Password"
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              Create Account
            </StyledButton>
          </form>
          <br />
          <br />
          <Link to="/">
            <p
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "15px",
              }}
            >
              Already have an account ? Log In here.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
