import express from "express";
import * as projectCtrl from "../controllers/project.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", projectCtrl.getAllProjects);
router.get("/:id", projectCtrl.getProjectById);
router.post("/", auth.requireSignin, auth.isAdmin, projectCtrl.createProject);
router.put("/:id", auth.requireSignin, auth.isAdmin, projectCtrl.updateProject);
router.delete("/:id", auth.requireSignin, auth.isAdmin, projectCtrl.deleteProject);

export default router;
