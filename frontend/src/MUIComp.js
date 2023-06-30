import { styled } from "@mui/material/styles";
import { Button, TextField } from "@mui/material";

export const StyledButton = styled(Button)({
  background: "#98EECC",
  boxShadow: "0 0px 0px 1px #17594A",
  color: "#030508",
  fontSize: "18px",
  fontFamily: "monospace",
  fontWeight: "bold",
  height: 48,
  padding: "0 10px",
  textTransform: "capitalize",
  "&:hover": {
    background: "#03C988",
    boxShadow: "0 0px 0px 1px #17594A",
  },
});

export const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    background-color: #ffffff;
  }
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #17594a;
  }
  .MuiInputLabel-root.Mui-focused {
    color: #17594a;
  }
`;
