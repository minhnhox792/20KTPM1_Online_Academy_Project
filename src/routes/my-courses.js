import express from "express";
import myCoursesController from "../app/controllers/MyCoursesController.js";

const router = express.Router();

router.get("/", myCoursesController.index);

export default router;
