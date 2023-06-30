import HomeImg from "../images/homeimg.jpg";
import HomeImg1 from "../images/homeimg1.jpg";
import { StyledButton } from "../MUIComp";
import { useNavigate } from "react-router-dom";
import LogInIcon from "@mui/icons-material/Login";

const HomePage = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleLogIn = () => {
    navigate("/login");
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
              variant="contained"
              endIcon={<LogInIcon />}
            >
              Log In
            </StyledButton>
            <StyledButton onClick={handleSignUp} variant="contained">
              Sign Up
            </StyledButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
