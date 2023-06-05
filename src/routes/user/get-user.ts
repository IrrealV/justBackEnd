import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { User } from "../../db/entity/user.js";

const userRepo  = AppDataSource.getRepository(User)

const getUserById = async (req:Request, res: Response) => {
    const { id } = req.params;

    const user = await userRepo.findOneBy({
        id: Number(id),
    });

    res.send(user);
};

export default getUserById