import express from "express";
import userController from "../app/controllers/UserController.js";
import { check } from "express-validator/check/index.js";
import passport from "passport";
import google from "../util/google.js"

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

router.get("/changePassword", userController.renderChangePassword);
router.post("/changePassword", userController.changePassword);
router.get("/profile", userController.renderProfile);
router.post("/profile", userController.updateProfile);

router.post("/buyProduct/:id", userController.addProduct);
router.post("/favoriteList/:id", userController.addFavoriteList);
router.get("/myCourse", userController.renderMyCourses);

router.get("/myFavoriteList", userController.renderMyFavoriteList);
router.post("/myFavoriteList/:id", userController.deleteCourse);

router.get("/google", passport.authenticate("google", {scope: ["profile", "email"],}));
router.get("/google/callback", passport.authenticate("google", {failureRedirect:'/error/500'}), userController.loginWithGoogle);

export default router;
