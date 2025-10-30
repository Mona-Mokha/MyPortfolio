import express from "express";
import authCtrl from "../controllers/auth.controller.js";
import { getAllProjects, getProjectById, createProject, updateProject, deleteProject } from "../controllers/project.controller.js";

const router = express.Router();

router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.post("/", authCtrl.requireSignin, createProject);
router.put("/:id", authCtrl.requireSignin, updateProject);
router.delete("/:id", authCtrl.requireSignin, deleteProject);

export default router;

