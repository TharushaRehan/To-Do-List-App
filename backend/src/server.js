import express from "express";
import { db, connectToDB } from "./db.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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

    const token = jwt.sign({ username: email.username }, "secret-key");
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Internal Server Error");
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

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

// Create a task
app.post("/api/tasks/addtask", authenticateToken, async (req, res) => {});

// Update a task
app.put("/api/tasks/updatetask", async (req, res) => {});

//Delete a task
app.delete("/api/tasks/deletetask", async (req, res) => {});

// Get all the tasks
app.get("/api/tasks/getalltasks", async (req, res) => {});

const PORT = 8000;
connectToDB(() => {
  console.log("Successfully connected to the database.");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
