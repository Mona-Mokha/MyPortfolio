import express from "express";
import * as educationCtrl from "../controllers/education.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", educationCtrl.getAllEducations);
router.get("/:id", educationCtrl.getEducationById);
router.post("/", auth.requireSignin, auth.isAdmin, educationCtrl.createEducation);
router.put("/:id", auth.requireSignin, auth.isAdmin, educationCtrl.updateEducation);
router.delete("/:id", auth.requireSignin, auth.isAdmin, educationCtrl.deleteEducation);

export default router;

