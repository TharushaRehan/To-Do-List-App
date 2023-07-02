import { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { ClickAwayListener } from "@mui/material";
import { TextField, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const StyledDatePicker = styled(DatePicker)`
  .MuiInputBase-root {
    background-color: #ffffff;
    border-color: #a116e6;
  }
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #a116e6;
  }
  .MuiInputLabel-root.Mui-focused {
    color: #a116e6;
  }
`;
const TaskForm = ({ open, onClose, UID }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [addedDate, setAddedDate] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [msg, setMsg] = useState("");
  const [isopen, setOpen] = useState(open);
  // get the current date
  useEffect(() => {
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const getCurrentDate = () => {
      const date = new Date();
      const formattedDate = formatDate(date);
      setAddedDate(formattedDate);
    };

    getCurrentDate();
  }, []);

  const handleClose = () => {
    onClose();
    setMsg("");
  };
  const handleClickAway = () => {
    // Close the dialog only if it's open
    if (open) {
      setOpen(false);
    }
  };
  const handleConfirm = async () => {
    setMsg("");
    if (title !== "" && deadline !== null) {
      try {
        // const response = await axios.post(
        //   "/api/tasks/addtask",
        //   {
        //     quantity,
        //     price,
        //   },
        //   { headers: headers }
        // );
        // const data = response.data;
        // console.log(data);
        // setMsg(data);
      } catch (err) {
        console.log(err);
      }
    } else {
      setMsg("Fill all the required fields");
    }
  };
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Task</DialogTitle>
        <br />
        <DialogContent>
          <Stack sx={{ width: "100%" }} spacing={3}>
            <TextField
              required
              label="Title"
              type="text"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label="Content (Default)"
              type="text"
              multiline
              rows={2}
              variant="outlined"
              fullWidth
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Deadline"
                  value={deadline}
                  format="YYYY-MM-DD"
                  onChange={(e) => setDeadline(e)}
                  disablePast
                />
              </DemoContainer>
            </LocalizationProvider>
          </Stack>
        </DialogContent>
        <p style={{ textAlign: "center", color: "red" }}>{msg ? msg : ""}</p>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
          <Button onClick={handleConfirm} color="secondary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </ClickAwayListener>
  );
};

export default TaskForm;
