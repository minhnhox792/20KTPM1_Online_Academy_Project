import express from "express";
import searchController from "../app/controllers/searchController.js"  

const router = express.Router()

router.get("/", searchController.searchHandle)  

export default router