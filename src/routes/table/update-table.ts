import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { Table } from "../../db/entity/table.js";

const tableRepo = AppDataSource.getRepository(Table);

const updateTableById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { state, room, restaurant } = req.body;

  const tableToUpdate = await tableRepo.findOneBy({ id: Number(id) });

  if (!tableToUpdate) {
    return res.status(404).send("Mesa no encontrada");
  }

  tableToUpdate.state = state;
  tableToUpdate.restaurant = restaurant;
  tableToUpdate.room = room;

  const updatedTable = await tableRepo.save(tableToUpdate);

  res.send({
    status: "Mesa actualizada con exito",
    table: updatedTable,
  });
};

export default updateTableById;
