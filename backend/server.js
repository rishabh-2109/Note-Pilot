import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import cors from "cors";
import mongoose from "mongoose";
import uploadRoutes from "./routes/uploadRoutes.js";
import summaryRoutes from "./routes/summaryRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";

const app = express();
const __dirname=path.resolve()

if(process.env.NODE_ENV!=="production"){
app.use(cors());
}


app.use(express.json());

app.use("/api/upload", uploadRoutes);  
app.use("/api/summary", summaryRoutes);
app.use("/api/email", emailRoutes);

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));

app.get("/*",(req,res)=>{
  res.sendFile(path.join(__dirname,"../frontend/dist","index.html"));
});
}

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
