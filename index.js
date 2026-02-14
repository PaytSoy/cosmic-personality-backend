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
    sunSign,
    moonSign,
    risingSign,
    interests,
    astrologyInfluence,
    visibility
  } = req.body;

  const newUser = {
    id: Date.now().toString(),
    name,
    mbti,
    enneagram,
    sunSign,
    moonSign,
    risingSign,
    interests: interests || [],
    astrologyInfluence:
      astrologyInfluence !== undefined ? astrologyInfluence : 30,
    visibility: visibility || {
      mbti: true,
      enneagram: true,
      sun: true,
      moon: true,
      rising: true
    },
    createdAt: new Date().toISOString()
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
