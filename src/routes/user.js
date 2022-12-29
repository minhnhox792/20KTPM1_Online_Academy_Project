import express from "express";
import userController from "../app/controllers/UserController.js";
import { check } from "express-validator/check/index.js";
import passport from "passport";
import google from "../util/google.js"
import middleware from "../app/controllers/middleware/authMiddleware.js"
const router = express.Router();
google(passport)

router.get("/login", userController.login);
router.get("/register", userController.register);
router.post("/login", userController.handlLogin);
router.post(
  "/register",
  check("email").isEmail().withMessage("Please enter a valid email !"),
  userController.solveRegister
);
router.get("/verifyOTP", userController.getverifyOTP);
router.post("/verifyOTP", userController.compareOTP);
router.post("/logout", userController.handleLogout);

router.get("/changePassword", middleware.isAuthenticated ,userController.renderChangePassword);
router.post("/changePassword", middleware.isAuthenticated, userController.changePassword);
router.get("/profile", middleware.isAuthenticated, userController.renderProfile);
router.post("/profile",  middleware.isAuthenticated, userController.updateProfile);

router.post("/buyProduct/:id", middleware.isAuthenticated, userController.addProduct);
router.post("/favoriteList/:id", middleware.isAuthenticated,  userController.addFavoriteList);
router.get("/myCourse", middleware.isAuthenticated, userController.renderMyCourses);

router.get("/myFavoriteList", middleware.isAuthenticated, userController.renderMyFavoriteList);
router.post("/myFavoriteList/:id", middleware.isAuthenticated, userController.deleteCourse);

router.get("/google", passport.authenticate("google", {scope: ["profile", "email"],}));
router.get("/google/callback", passport.authenticate("google", {failureRedirect:'/error/500'}), userController.loginWithGoogle);

router.get("/reset", userController.getReset)
router.post("/reset", userController.postReset)

export default router;
