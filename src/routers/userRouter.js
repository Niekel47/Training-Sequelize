import express from "express";
import User from "../models/user";

const router = express.Router();

// GET /users
router.get("/user", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /users/:id
router.get("/user:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /users
router.post("/user", async (req, res) => {
  const { username, email } = req.body;
  try {
    const user = await User.create({ username, email });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /users/:id
router.put("/user:id", async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      user.username = username;
      user.email = email;
      await user.save();
      res.json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /users/:id
router.delete("/user:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      await user.destroy();
      res.json({ message: "User deleted" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
