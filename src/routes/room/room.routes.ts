import { Router} from "express";
import getRoomById from "./get-room.js";
import createRoom from "./create-room.js";
import getAllRooms from "./get-all-rooms.js";
import updateRoomById from "./update-room.js";
import deleteRoomById from "./delete-room.js";
import getRoomByRestaurant from "./get-room-restaurant.js";
import validateNewRoom from "../../validators/room.validator.js";

const router = Router();

router.get('/room/:id', getRoomById)
router.get('/rooms', getAllRooms)
router.get('/room_restaurant/:id', getRoomByRestaurant)
router.post('/room',validateNewRoom ,createRoom);
router.put('room/:id', updateRoomById)
router.delete('/room/:id', deleteRoomById)

export default router