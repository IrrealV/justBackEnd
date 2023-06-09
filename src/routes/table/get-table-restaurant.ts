import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { Table } from "../../db/entity/table.js";
import { Restaurant } from "../../db/entity/restaurant.js";

const tableRepo = AppDataSource.getRepository(Table);
const restaurantRepo = AppDataSource.getRepository(Restaurant);

const getTableByRestaurant = async (req: Request, res: Response) => {
  const { id } = req.params;

  const restaurantToFind = await restaurantRepo.findOneBy({ id: Number(id) });

  if (!restaurantToFind) {
    return res.status(404).send("Restaurante no encontrado");
  }

  const tableFromRestaurant = await tableRepo.find({
    where: {
      restaurant: restaurantToFind,
    },
  });

  res.send(tableFromRestaurant);
};

export default getTableByRestaurant;
