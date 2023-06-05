import { Router } from "express";
import getUserById from "./get-user.js";
import getAllUsers from "./get-all-users.js";
import deleteUser from "./delete-user.js";
import updateUserById from "./update-user.js";
import uploadedProfile from "../../middlewares/imageHelper.js";

const profile = uploadedProfile.uploadedProfile
const router = Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.delete("/delete_user/:id", deleteUser);
router.put("/update_user/:id", profile , updateUserById)

export default router;
