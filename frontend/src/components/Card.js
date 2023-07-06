import { IconButton } from "@mui/material";
import { Delete, Edit, Done, Grade } from "@mui/icons-material";
import { useState } from "react";
import DeleteTask from "./DeleteTask";
import UpdateTask from "./UpdateTask";
import ComlpeteTask from "./MarkAsDone";
import ImportantTask from "./MarksAsImportant";

const Card = ({ task }) => {
  const [deleteTask, setDeleteTask] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [doneTask, setDoneTask] = useState(null);
  const [importantTask, setImportantTask] = useState(null);

  const handleDeleteTask = (key) => {
    setDeleteTask(key);
    console.log(key);
  };

  const handleEditTask = (key) => {
    setEditTask(key);
    console.log(key);
  };
  const handleDoneTask = (key) => {
    setDoneTask(key);
    console.log(key);
  };
  const handleImportantTask = (key) => {
    setImportantTask(key);
    console.log(key);
  };
  const handleAlertDialogClose = () => {
    setEditTask(null);
    setDeleteTask(null);
    setDoneTask(null);
    setImportantTask(null);
  };

  return (
    <div className="card-wrapper">
      <div className="task-title">{task.title}</div>
      <div className="task-content">{task.content}</div>
      <div className="task-addDate">Added Date : {task.addedDate}</div>
      <div className="task-deadline">Deadline : {task.deadline}</div>
      <div className="task-btns">
        <IconButton onClick={() => handleDoneTask(task._id)}>
          <Done />
        </IconButton>
        <IconButton onClick={() => handleImportantTask(task._id)}>
          <Grade />
        </IconButton>
        <IconButton onClick={() => handleEditTask(task._id)}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => handleDeleteTask(task._id)}>
          <Delete color="error" />
        </IconButton>

        {deleteTask && (
          <DeleteTask
            open={true}
            taskID={deleteTask}
            onClose={handleAlertDialogClose}
          />
        )}
        {editTask && (
          <UpdateTask
            open={true}
            taskID={editTask}
            onClose={handleAlertDialogClose}
          />
        )}
        {doneTask && (
          <ComlpeteTask
            open={true}
            taskID={doneTask}
            onClose={handleAlertDialogClose}
          />
        )}
        {importantTask && (
          <ImportantTask
            open={true}
            taskID={importantTask}
            onClose={handleAlertDialogClose}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
