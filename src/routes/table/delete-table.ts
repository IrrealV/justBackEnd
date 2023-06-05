import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { Table } from "../../db/entity/table.js";

const tableRepo = AppDataSource.getRepository(Table);

const deleteTableById = async (req: Request, res: Response) => {
  const id = req.params.id;

  const tableToDelelte = await tableRepo.delete({
    id: Number(id),
  });

  res.send({
    status: "Deleted successfully",
    table: tableToDelelte,
  });
};

export default deleteTableById;
