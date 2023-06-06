import { Router } from "express";
import login from "./login.js";
import validateNewUser from "../../validators/user.validator.js";
import createUser from "../user/create-user.js";
import uploadedProfile from "../../middlewares/imageHelper.js";
import resetPasswordRequest from "./reset-password-request.js";
import resetPassword from "./reset-password.js";
import { verifyUser } from "./verify-user.js";

const router = Router();
const profile = uploadedProfile.uploadedProfile;

router.post("/login", login);
router.post("/register", validateNewUser, profile, createUser);
router.post("/reset-password-request", resetPasswordRequest);
router.post("/reset-password", resetPassword);
router.get("/verify-user", verifyUser);

export default router;
