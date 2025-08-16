import express from "express";
const app = express();


// Middleware
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Notes Summarizer API is running");
});

const PORT=3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)}
);