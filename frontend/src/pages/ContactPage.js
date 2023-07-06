import { StyledButton, StyledTextField } from "../MUIComp";
import { useState } from "react";
import { Stack } from "@mui/material";
import Icon from "@mui/icons-material/ArrowUpward";
import ContactImg from "../images/12982910_5124556.jpg";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify({ name, email, mobile, message }, null, 2));
  };
  return (
    <div className="ContactPage">
      <div className="contact-container">
        <img
          src={ContactImg}
          style={{ height: "500px", borderRadius: "25px" }}
          alt="HomeImage"
        />
        <form onSubmit={handleSubmit}>
          <p style={{ fontSize: "30px" }}>Contact Us</p>
          <Stack sx={{ width: "100%" }} spacing={6}>
            <StyledTextField
              required
              label="Name"
              className="textfield"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <StyledTextField
              required
              label="Email"
              type="email"
              className="textfield"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <StyledTextField
              required
              label="Mobile Number"
              className="textfield"
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />

            <StyledTextField
              required
              multiline
              rows={4}
              type="text"
              label="Message"
              className="textfield"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Stack>
          <div className="con-btn">
            <StyledButton
              type="submit"
              size="large"
              endIcon={<Icon />}
              variant="outlined"
            >
              Submit
            </StyledButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
