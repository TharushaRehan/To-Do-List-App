import { Link, useNavigate } from "react-router-dom";
//import useUser from "./hooks/useUser";
//import { getAuth, signOut } from "firebase/auth";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import LogInIcon from "@mui/icons-material/Login";
import LogOutIcon from "@mui/icons-material/Logout";

export const StyledButton = styled(Button)({
  background: "linear-gradient(60deg, #D4ADFC 40%, #AD7BE9 90%)",
  border: 0,
  borderRadius: 3,
  color: "#030508",
  fontWeight: "bold",
  height: 48,
  padding: "0 30px",
});

const NavBar = () => {
  //const { user } = useUser();
  const navigate = useNavigate();

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
      </ul>
      <div className="nav-right">
        {/* {user ? (
          <StyledButton
            variant="outlined"
            onClick={() => {
              signOut(getAuth());
            }}
            endIcon={<LogOutIcon />}
          >
            Log Out
          </StyledButton>
        ) : (
          <StyledButton
            variant="outlined"
            onClick={() => {
              navigate("/");
            }}
            endIcon={<LogInIcon />}
          >
            Log In
          </StyledButton>
        )} */}
      </div>
    </nav>
  );
};

export default NavBar;
