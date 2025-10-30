import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  firstname: String,
  lastname: String,
  email: String,
  completion: Date,
  description: String,
}, { timestamps: true });

const Education = mongoose.model("Education", educationSchema);
export default Education;
