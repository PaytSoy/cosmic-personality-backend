const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

/* ======================
   IN-MEMORY DATABASE
====================== */

let users = [];

/* ======================
   HOME ROUTE
====================== */

app.get("/", (req, res) => {
  res.send("🌌 Cosmic Personality backend is running");
});

/* ======================
   CREATE USER
====================== */

app.post("/users", (req, res) => {
  const {
    name,
    mbti,
    enneagram,
    zodiac,
    empathy,
    energy
  } = req.body;

  const newUser = {
    id: Date.now().toString(),
    name,
    mbti,
    enneagram,
    zodiac,
    empathy,
    energy
  };

  users.push(newUser);

  res.json(newUser);
});

/* ======================
   GET ALL USERS
====================== */

app.get("/users", (req, res) => {
  res.json(users);
});

/* ======================
   START SERVER
====================== */

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

