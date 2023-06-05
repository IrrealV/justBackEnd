import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { Opinion } from "../../db/entity/opinion.js";
import { Restaurant } from "../../db/entity/restaurant.js";

const opinionRepo = AppDataSource.getRepository(Opinion);
const restaurantRepo = AppDataSource.getRepository(Restaurant);

const getOpinionByRestaurant = async (req: Request, res: Response) => {
  const { id } = req.params;

  const restaurantToFind = await restaurantRepo.findOneBy({ id: Number(id) });

  if (!restaurantToFind) {
    return res.status(404).send("Restaurant not found");
  }

  const opinionFromRestaurant = await opinionRepo.find({
    where: {
      restaurant: restaurantToFind,
    },
  });

  res.send(opinionFromRestaurant);
};

export default getOpinionByRestaurant;
