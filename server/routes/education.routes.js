import express from "express";
import authCtrl from "../controllers/auth.controller.js";
import { getAllEducations, getEducationById, createEducation, updateEducation, deleteEducation } from "../controllers/education.controller.js";

const router = express.Router();

router.get("/", getAllEducations);
router.get("/:id", getEducationById);
router.post("/", authCtrl.requireSignin, createEducation);
router.put("/:id", authCtrl.requireSignin, updateEducation);
router.delete("/:id", authCtrl.requireSignin, deleteEducation);

export default router;

