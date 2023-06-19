import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { Opinion } from "../../db/entity/opinion.js";
import { User } from "../../db/entity/user.js";
import { Restaurant } from "../../db/entity/restaurant.js";

const opinionRepo = AppDataSource.getRepository(Opinion);
const userRepo = AppDataSource.getRepository(User);
const restaurantRepo = AppDataSource.getRepository(Restaurant);

const createOpinion = async (req: Request, res: Response) => {
    const { comment, score, creationDate, restaurant_id, user_id } = req.body;

    // Buscar el restaurante y el usuario en la base de datos
    const restaurant = await restaurantRepo.findOneBy({ id: restaurant_id });
    const user = await userRepo.findOneBy({ id: user_id });

  if (!restaurant || !user) {
    return res.status(404).send("Restaurante o usuario no encontrado");
  }

  // Crear la opinión y establecer las relaciones
  const opinion = new Opinion();
  opinion.comment = comment;
  opinion.score = score;
  opinion.creationDate = new Date(creationDate);
  opinion.restaurant = restaurant;
  opinion.user = user;

  const savedOpinion = await opinionRepo.save(opinion);

  res.send({
    status: "exito",
    opinion: savedOpinion,
  });
};

export default createOpinion;
