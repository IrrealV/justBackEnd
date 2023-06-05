import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { User } from "../../db/entity/user.js";

const userRepo = AppDataSource.getRepository(User)

const deleteUserById =async (req:Request, res: Response) => {
    const id = req.params

    const userToDelete = await userRepo.delete({
        id: Number(id)
    });

    res.send({
        status: "Deleted successfully",
        user : userToDelete
    })
}

export default deleteUserById