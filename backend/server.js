import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";

import uploadRoutes from "./routes/uploadRoutes.js";
import summaryRoutes from "./routes/summaryRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRoutes);   // <-- Add this
app.use("/api/summary", summaryRoutes);
app.use("/api/email", emailRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
