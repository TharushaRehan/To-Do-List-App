import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StyledButton, StyledTextField } from "../MUIComp";
import { Done, Grade, Add, ViewList } from "@mui/icons-material";
import TaskForm from "../components/TaskForm";
import Card from "../components/Card";
import axios from "axios";

const ToDoList = () => {
  const [addBtn, setAddBtn] = useState(false);
  const [tasksList, setTasksList] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [importantTasks, setImportantTasks] = useState([]);
  const [tab, setTab] = useState("all");

  const handleTabChange = (tab) => {
    setTab(tab);
  };
  const handleAddTask = () => {
    setAddBtn(true);
  };

  const handleAlertDialogClose = () => {
    setAddBtn(false);
  };

  useEffect(() => {
    getAllTasks();
    getCompletedTasks();
    getImportantTasks();
  }, [addBtn, tasksList]);

  const getAllTasks = async () => {
    try {
      const response = await axios.get("/api/tasks/getalltasks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = response.data;
      //console.log(data);
      setTasksList(data);
      console.log(tasksList);
    } catch (error) {
      console.log("Error getting tasks", error);
    }
  };

  const getCompletedTasks = async () => {
    try {
      const response = await axios.get("/api/tasks/getcompletedtasks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = response.data;
      //console.log(data);
      setCompletedTasks(data);
      console.log(completedTasks);
    } catch (error) {
      console.log("Error getting tasks", error);
    }
  };

  const getImportantTasks = async () => {
    try {
      const response = await axios.get("/api/tasks/getimportanttasks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = response.data;
      //console.log(data);
      setImportantTasks(data);
      console.log(importantTasks);
    } catch (error) {
      console.log("Error getting tasks", error);
    }
  };
  const renderTab = () => {
    if (tab === "all") {
      return (
        <>
          <p style={{ fontSize: "30px", paddingLeft: "2%" }}>All Tasks</p>
          <div className="tasks-container">
            {tasksList.map((task) => (
              <Card key={task._id} task={task} />
            ))}
          </div>
        </>
      );
    } else if (tab === "completed") {
      return (
        <>
          <p style={{ fontSize: "30px", paddingLeft: "2%" }}>Completed Tasks</p>
          <div className="tasks-container">
            {completedTasks.map((task) => (
              <Card key={task._id} task={task} />
            ))}
          </div>
        </>
      );
    } else if (tab === "important") {
      return (
        <>
          <p style={{ fontSize: "30px", paddingLeft: "2%" }}>Important Tasks</p>
          <div className="tasks-container">
            {importantTasks.map((task) => (
              <Card key={task._id} task={task} />
            ))}
          </div>
        </>
      );
    }
  };
  return (
    <div className="todolist-page">
      <div className="todo-sec1">
        <h1>TO DO LIST</h1>
        <div className="task-navbar">
          <StyledButton onClick={handleAddTask} endIcon={<Add />}>
            Add Task
          </StyledButton>
          <StyledButton
            endIcon={<ViewList />}
            onClick={() => handleTabChange("all")}
          >
            All Tasks
          </StyledButton>
          <StyledButton
            endIcon={<Done />}
            onClick={() => handleTabChange("completed")}
          >
            Completed
          </StyledButton>
          <StyledButton
            endIcon={<Grade />}
            onClick={() => handleTabChange("important")}
          >
            Important
          </StyledButton>
          {addBtn && <TaskForm open={true} onClose={handleAlertDialogClose} />}
        </div>
        {renderTab()}
      </div>
    </div>
  );
};

export default ToDoList;
