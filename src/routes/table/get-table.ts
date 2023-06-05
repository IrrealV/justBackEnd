import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { Table } from "../../db/entity/table.js";

const tableRepo = AppDataSource.getRepository(Table);

const getTableById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const table = await tableRepo.findOneBy({
    id: Number(id),
  });

  res.send(table);
};

export default getTableById;
