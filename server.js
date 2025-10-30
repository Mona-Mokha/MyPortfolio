import config from "./config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";

// ✅ Import routes 
import projectRoutes from "./server/routes/project.routes.js";
import contactRoutes from "./server/routes/contact.routes.js";
import educationRoutes from "./server/routes/education.routes.js";
import userRoutes from "./server/routes/user.routes.js";

// Auth and error routes:
import authRoutes from "./server/routes/auth.routes.js";
//import errorRoutes from "./server/routes/error.routes.js";

// -------------------
// MongoDB connection
// -------------------
mongoose.Promise = global.Promise;

mongoose
  .connect(config.mongoUri, {})
  .then(() => {
    console.log("✅ Connected to the database!");
  })
  .catch((error) => {
    console.error("❌ Database connection error:", error.message);
  });

// -------------------
// Express Routes
// -------------------
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Portfolio API 🚀" });
});

// Register routes
app.use("/api/projects", projectRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/educations", educationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
//app.use("/api/errors", errorRoutes);

// -------------------
// Start the server
// -------------------
app.listen(config.port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info(`🌐 Server started on port ${config.port}`);
  }
});
