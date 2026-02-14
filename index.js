const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

/* ======================
   IN-MEMORY DATABASE
====================== */

let users = [];

/* ======================
   HOME
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
    visibility,
    isPublic
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
    isPublic: isPublic !== undefined ? isPublic : true,
    friends: [],
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  res.json(newUser);
});

/* ======================
   ADD FRIEND (REQUEST)
====================== */

app.post("/friends/add", (req, res) => {
  const { fromUserId, toUserId } = req.body;

  const fromUser = users.find(u => u.id === fromUserId);
  const toUser = users.find(u => u.id === toUserId);

  if (!fromUser || !toUser) {
    return res.status(404).json({ error: "User not found" });
  }

  if (!fromUser.friends.includes(toUserId)) {
    fromUser.friends.push(toUserId);
  }

  res.json({ success: true });
});

/* ======================
   GET RANKABLE FRIENDS
====================== */

app.get("/rankable/:userId", (req, res) => {
  const user = users.find(u => u.id === req.params.userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const rankableFriends = users.filter(other => {
    if (other.isPublic) return false;
    return (
      user.friends.includes(other.id) &&
      other.friends.includes(user.id)
    );
  });

  res.json(rankableFriends);
});

/* ======================
   GET ALL USERS (DEBUG)
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
