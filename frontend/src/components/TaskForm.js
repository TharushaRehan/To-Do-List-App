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
    border-color: #1ad7ab;
  }
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #1ad7ab;
  }
  .MuiInputLabel-root.Mui-focused {
    color: #1ad7ab;
  }
`;
const TaskForm = ({ open, onClose, UID }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [addedDate, setAddedDate] = useState("");
  const [deadlineDate, setDeadline] = useState(null);
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

  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
  };
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
    if (title !== "" && deadlineDate !== null) {
      try {
        const deadline = handleDateChange(deadlineDate);

        console.log(localStorage.getItem("token"));
        const response = await axios.post(
          "/api/tasks/addtask",
          {
            title,
            content,
            addedDate,
            deadline,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = response.data;
        console.log(data);
        setMsg(data);
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
                <StyledDatePicker
                  label="Deadline"
                  value={deadlineDate}
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
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Close
          </Button>
          <Button onClick={handleConfirm} color="secondary" variant="outlined">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </ClickAwayListener>
  );
};

export default TaskForm;
