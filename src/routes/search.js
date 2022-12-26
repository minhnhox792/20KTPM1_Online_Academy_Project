import express from "express";
import searchController from "../app/controllers/searchController.js"  

const router = express.Router()

router.get("/", searchController.searchHandle)  
router.post("/postCourse",searchController.postCourse)
export default router