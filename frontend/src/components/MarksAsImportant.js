import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import DialogActions from "@mui/material/DialogActions";

import { ClickAwayListener } from "@mui/material";

import Button from "@mui/material/Button";
import axios from "axios";

const ImportantTask = ({ open, onClose, taskID }) => {
  const [msg, setMsg] = useState("");
  const [isopen, setOpen] = useState(open);

  const handleClose = () => {
    onClose();
    setMsg("");
  };

  const handleConfirm = async () => {
    setMsg("");
    try {
      const response = await axios.put(`/api/tasks/markasimportant/${taskID}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = response.data;
      setMsg(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleClickAway = () => {
    // Close the dialog only if it's open
    if (isopen) {
      setOpen(false);
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Dialog open={isopen} onClose={handleClose}>
        <DialogTitle>Mark as Important ?</DialogTitle>
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

export default ImportantTask;
