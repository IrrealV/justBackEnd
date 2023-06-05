import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { Room } from "../../db/entity/room.js";

const roomRepo = AppDataSource.getRepository(Room)

const getAllRooms =async (req:Request, res: Response) => {
    const rooms = await roomRepo.find()

    res.send(rooms)
}

export default getAllRooms