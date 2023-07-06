import HomeImg from "../images/homeimg.jpg";
import HomeImg1 from "../images/homeimg1.jpg";
import { StyledButton } from "../MUIComp";
import { useNavigate } from "react-router-dom";
import LogInIcon from "@mui/icons-material/Login";
import { useEffect, useState } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUser(token);
  }, []);
  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleLogIn = () => {
    navigate("/login");
  };

  const handleContinue = () => {
    navigate("/todolist");
  };

  return (
    <div className="HomePage">
      <p
        style={{
          fontSize: "70px",
          textAlign: "left",
          paddingLeft: "5%",
          paddingTop: "2%",
        }}
      >
        Welcome back !
      </p>
      <div className="Home-Container">
        <img className="home-image" src={HomeImg} alt="HomeImage" />
        <div className="home-descr">
          <p>
            Easily add new tasks to your to-do list and assign priority levels
            to ensure important tasks are highlighted.
            <br />
            <br />
            Assign due dates to tasks and set reminders to receive notifications
            and stay on track with deadlines.
          </p>
          <br />
          <br />
          <div className="home-btns">
            <StyledButton
              onClick={handleLogIn}
              variant="outlined"
              endIcon={<LogInIcon />}
              disabled={user ? true : false}
            >
              Log In
            </StyledButton>
            <StyledButton
              onClick={handleSignUp}
              variant="outlined"
              disabled={user ? true : false}
            >
              Sign Up
            </StyledButton>
            <StyledButton
              onClick={handleContinue}
              variant="outlined"
              disabled={user ? false : true}
            >
              Continue
            </StyledButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
