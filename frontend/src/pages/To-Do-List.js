import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StyledButton, StyledTextField } from "../MUIComp";
import TaskForm from "../components/TaskForm";
const ToDoList = () => {
  const [addBtn, setAddBtn] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    setAddBtn(true);
  };
  const handleAlertDialogClose = () => {
    setAddBtn(false);
  };

  return (
    <div className="todolist-page">
      <div className="todo-sec1">
        <h1>TO DO LIST</h1>
        <StyledButton onClick={handleAddTask}>Add Task</StyledButton>
        {addBtn && <TaskForm open={true} onClose={handleAlertDialogClose} />}
      </div>
    </div>
  );
};

export default ToDoList;
