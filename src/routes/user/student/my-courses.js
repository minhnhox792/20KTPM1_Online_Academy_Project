import express from "express";
import myCoursesController from "../../../app/controllers/MyCoursesController.js";

const router = express.Router();

router.get("/", myCoursesController.index);
router.get("/learning", myCoursesController.learning);
router.get("/lists", myCoursesController.lists);
router.get("/watchlist", myCoursesController.watchlist);
router.get("/archived", myCoursesController.archived);
router.get("/profile", myCoursesController.profile);

export default router;
