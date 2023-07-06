import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { TextField, Stack } from "@mui/material";
import { ClickAwayListener } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import axios from "axios";

const UpdateTask = ({ open, onClose, taskID }) => {
  const [content, setContent] = useState("");
  const [deadlineDate, setDeadline] = useState(null);
  const [msg, setMsg] = useState("");
  const [isopen, setOpen] = useState(open);

  const handleClose = () => {
    onClose();
    setMsg("");
  };
  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
  };
  const handleConfirm = async () => {
    setMsg("");
    if (content !== "" && deadlineDate !== "") {
      const deadline = handleDateChange(deadlineDate);
      try {
        const response = await axios.put(
          `/api/tasks/updatetask/${taskID}`,
          {
            content,
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
    }
  };
  const handleClickAway = () => {
    // Close the dialog only if it's open
    if (open) {
      setOpen(false);
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update the task</DialogTitle>
        <br />
        <DialogContent>
          <Stack sx={{ width: "100%" }} spacing={3}>
            <TextField
              label="Content"
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

export default UpdateTask;
