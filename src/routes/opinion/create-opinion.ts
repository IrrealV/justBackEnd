import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { Opinion } from "../../db/entity/opinion.js";

const opinionRepo = AppDataSource.getRepository(Opinion)

const createOpinion =async (req:Request, res: Response) => {
    const opinion = req.body

    const opinionToSave = await opinionRepo.save(opinion)

    res.send({
        status: 'success',
        opinion: opinionToSave,
    })
}

export default createOpinion;