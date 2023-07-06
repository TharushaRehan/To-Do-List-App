import express from "express";
import { db, connectToDB } from "./db.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

const app = express();
app.use(express.json());

// User schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

// Task schema
const taskSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  title: { type: String, required: true },
  content: { type: String, default: "" },
  addedDate: { type: String, required: true },
  deadline: { type: String, required: true },
  important: { type: Boolean, default: false },
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model("Task", taskSchema);

function authenticateToken(req, res, next) {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).send("Access token not found");
  }

  jwt.verify(token, "secret-key", (err, user) => {
    if (err) {
      console.error("Error verifying token:", err);
      return res.status(403).send("Invalid token");
    }

    req.user = user;
    next();
  });
}

// Register the user
app.post("/api/users/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const exist = await db.collection("users").findOne({ email });
    if (!exist) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword });
      await db.collection("users").insertOne(user);
      res.send("User Registered Successfully");
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Log in users
app.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send("Invalid password");
    }

    const token = jwt.sign({ user }, "secret-key");
    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Create a task
app.post("/api/tasks/addtask", authenticateToken, async (req, res) => {
  const { title, content, addedDate, deadline } = req.body;
  const userId = req.user.user._id;

  try {
    const task = new Task({
      user: userId,
      title,
      content,
      addedDate,
      deadline,
    });
    if (userId) {
      await db.collection("tasks").insertOne(task);
      res.send("Task Added Successfully");
    }
  } catch (error) {
    console.log("Error creating task", error);
  }
});

// Update a task
app.put("/api/tasks/updatetask/:id", authenticateToken, async (req, res) => {
  const taskId = req.params;
  const { content, deadline } = req.body;

  try {
    const task = await db
      .collection("tasks")
      .findOne({ _id: new ObjectId(taskId) });
    if (task) {
      const filter = { _id: new ObjectId(taskId) };
      const update = {
        $set: { content: content, deadline: deadline },
      };
      await db.collection("tasks").updateOne(filter, update);
      res.send("Task Updated");
    }
  } catch (error) {
    res.send("Couldn't delete the task", error);
  }
});

//Delete a task
app.delete("/api/tasks/deletetask/:id", authenticateToken, async (req, res) => {
  const taskId = req.params;
  //console.log(taskId);
  try {
    const ID = { _id: new ObjectId(taskId) };
    await db.collection("tasks").deleteOne(ID);
    res.send("Task Deleted");
  } catch (error) {
    res.send("Couldn't delete the task", error);
  }
});

// Get all the tasks
app.get("/api/tasks/getalltasks", authenticateToken, async (req, res) => {
  const userId = req.user.user._id;
  //console.log(userId);
  try {
    const tasks = await db.collection("tasks").find({ user: userId }).toArray();
    //console.log(tasks);
    res.send(tasks);
  } catch (error) {
    console.log("Error getting tasks", error);
    res.send("internal Server Error");
  }
});

// Get all the comlpeted tasks
app.get("/api/tasks/getcompletedtasks", authenticateToken, async (req, res) => {
  const userId = req.user.user._id;
  //console.log(userId);
  try {
    const tasks = await db
      .collection("tasks")
      .find({ user: userId, completed: true })
      .toArray();

    res.send(tasks);
  } catch (error) {
    console.log("Error getting tasks", error);
    res.send("internal Server Error");
  }
});

// Get all the important tasks
app.get("/api/tasks/getimportanttasks", authenticateToken, async (req, res) => {
  const userId = req.user.user._id;
  //console.log(userId);
  try {
    const tasks = await db
      .collection("tasks")
      .find({ user: userId, important: true })
      .toArray();

    res.send(tasks);
  } catch (error) {
    console.log("Error getting tasks", error);
    res.send("internal Server Error");
  }
});

// mark as completetd the task
app.put("/api/tasks/completetask/:id", async (req, res) => {
  const taskId = req.params;
  console.log(taskId);
  try {
    const filter = { _id: new ObjectId(taskId) };
    const task = await db.collection("tasks").findOne(filter);
    if (task) {
      const update = {
        $set: { completed: true },
      };
      await db.collection("tasks").updateOne(filter, update);
      res.send("Mark as completed");
    }
  } catch (error) {
    res.send("Couldn't delete the task", error);
  }
});

// mark as important the task
app.put("/api/tasks/markasimportant/:id", async (req, res) => {
  const taskId = req.params;

  try {
    const filter = { _id: new ObjectId(taskId) };
    const task = await db.collection("tasks").findOne(filter);
    if (task) {
      if (task.important === true) {
        const update = {
          $set: { important: false },
        };
        await db.collection("tasks").updateOne(filter, update);
        res.send("Mark as Not Important");
      } else {
        const update = {
          $set: { important: true },
        };
        await db.collection("tasks").updateOne(filter, update);
        res.send("Mark as Important");
      }
    }
  } catch (error) {
    res.send("Couldn't delete the task", error);
  }
});

const PORT = 8000;
connectToDB(() => {
  console.log("Successfully connected to the database.");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
