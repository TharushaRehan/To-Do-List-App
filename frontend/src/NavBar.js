import { Link, useNavigate } from "react-router-dom";
//import useUser from "./hooks/useUser";
//import { getAuth, signOut } from "firebase/auth";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import LogInIcon from "@mui/icons-material/Login";
import LogOutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";

export const StyledButton = styled(Button)({
  background: "#03C988",
  border: 0,
  borderRadius: 20,
  color: "#030508",
  fontWeight: "bold",
  height: 40,
  "&:hover": {
    background: "#c9f0e7",
    boxShadow: "0 0px 0px 1px #17594A",
  },
});

const NavBar = () => {
  //const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          {localStorage.getItem("token") ? (
            <StyledButton
              variant="outlined"
              onClick={() => {
                localStorage.removeItem("token");
              }}
              endIcon={<LogOutIcon />}
            >
              Log Out
            </StyledButton>
          ) : (
            <StyledButton
              variant="outlined"
              onClick={() => {
                navigate("/login");
              }}
              endIcon={<LogInIcon />}
            >
              Log In
            </StyledButton>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
