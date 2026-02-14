const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

/* ======================
   SAMPLE DATA
====================== */

const friends = [
  { id: "alex", empathy: 90, energy: 60 },
  { id: "sam", empathy: 70, energy: 95 }
];

/* ======================
   HOME ROUTE
====================== */

app.get("/", (req, res) => {
  res.send("✅ Cosmic Personality backend is running");
});

/* ======================
   RANK ROUTE
====================== */

app.post("/rank", (req, res) => {
  const { category } = req.body;

  if (category === "emotional_support") {
    const ranked = [...friends].sort((a, b) => b.empathy - a.empathy);
    return res.json(ranked);
  }

  if (category === "concerts") {
    const ranked = [...friends].sort((a, b) => b.energy - a.energy);
    return res.json(ranked);
  }

  res.json({ error: "Unknown category" });
});

/* ======================
   START SERVER
====================== */

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
