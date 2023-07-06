import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import axios from "axios";
import { ClickAwayListener } from "@mui/material";
const DeleteTask = ({ open, onClose, taskID }) => {
  const [msg, setMsg] = useState("");
  const [isopen, setOpen] = useState(open);
  const handleClose = () => {
    onClose();
    setMsg("");
  };

  const handleConfirm = async () => {
    setMsg("");
    try {
      const response = await axios.delete(`/api/tasks/deletetask/${taskID}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = response.data;
      console.log(data);
      setMsg(data);
    } catch (err) {
      console.log(err);
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
        <DialogTitle>Are you sure, you want to delete this task?</DialogTitle>
        <br />

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

export default DeleteTask;
