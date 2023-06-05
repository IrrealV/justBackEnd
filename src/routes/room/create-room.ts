import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { Room } from "../../db/entity/room.js";

const roomRepo = AppDataSource.getRepository(Room)

const createRoom =async (req:Request, res: Response) => {
    const room = req.body

    const roomToSave = await roomRepo.save(room)

    res.send({
        status: 'success',
        room: roomToSave,
    })
}

export default createRoom;