import { Router } from "express";
import getAllRestaurants from "./get-all-restaurants.js";
import getRestaurantById from "./get-restaurant.js";
import deleteRestaurantById from "./delete-restaurant.js";
import createRestaurant from "./create-restaurant.js";
import updateRestaurantById from "./update-restaurant.js";
import validateCreate from "../../validators/restaurants.validator.js";

const router = Router();

router.get("/get_all_restaurants", getAllRestaurants);
router.post("/restaurants", validateCreate, createRestaurant);
router.get("/restaurants/:id", getRestaurantById);
router.delete("/restaurants/:id", deleteRestaurantById);
router.put("/restaurants/:id", updateRestaurantById);

export default router;
