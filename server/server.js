import config from "../config/config.js";
import app from "./express.js";
import mongoose from "mongoose";
import cors from "cors";
import express from "express";


app.use(cors());
// Import routes
import projectRoutes from "./routes/project.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import educationRoutes from "./routes/education.routes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
// __dirname and __filename setup
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// MongoDB connection
mongoose.Promise = global.Promise;

mongoose
  .connect(config.mongoUri, {})
  .then(() => {
    console.log("✅ Connected to the database!");
  })
  .catch((error) => {
    console.error("❌ Database connection error:", error.message);
  });

// Express Routes
//app.get("/", (req, res) => {
//res.json({ message: "Welcome to the Portfolio API 🚀" });  });

app.use("/api/projects", projectRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/educations", educationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist","index.html"));
})

// Start server
app.listen(config.port, (err) => {
  if (err) console.error(err);
  else console.info(`🚀 Server running at http://localhost:${config.port}`);
});
