import mongoose from "mongoose";

const summarySchema = new mongoose.Schema({
  transcript: { type: String, required: true },
  instruction: { type: String },
  summary: { type: String, required: true },
}, { timestamps: true });

const Summary = mongoose.model("Summary", summarySchema);
export default Summary;
