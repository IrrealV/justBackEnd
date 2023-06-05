import { Router } from "express";
import getTableById from "./get-table.js";
import createTable from "./create-table.js";
import updateTableById from "./update-table.js";
import deleteTableById from "./delete-table.js";
import getTableByRoom from "./get-table-room.js";
import validateNewTable from "../../validators/table.validator.js";
import getTableByRestaurant from "./get-table-restaurant.js";

const router = Router();

router.get("/table/:id", getTableById);
router.get("/tables_room/:id", getTableByRoom);
router.get("/tables_restaurant/:id", getTableByRestaurant);
router.post("/table", validateNewTable, createTable);
router.put("/update_table", updateTableById);
router.delete("/delete_table/:id", deleteTableById);

export default router;