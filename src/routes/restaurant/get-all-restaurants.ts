import { Request, Response } from "express";
import { In } from "typeorm";
import { AppDataSource } from "../../db/data-source.js";
import { Restaurant } from "../../db/entity/restaurant.js";
import { Opinion } from "../../db/entity/opinion.js";

const restaurantRepo = AppDataSource.getRepository(Restaurant);
const opinionRepo = AppDataSource.getRepository(Opinion);

const getAllRestaurants = async (req: Request, res: Response) => {
  const restaurants = await restaurantRepo.find();
  const restaurantIds = restaurants.map((restaurant) => restaurant.id);

  const opinions = await opinionRepo.find({
    where: { restaurant: { id: In(restaurantIds) } },
    relations: ["restaurant", "user"],
  });

  //Mapeo de la respuesta para que sea igual a la que ha sido presentada
  const formattedRestaurants = restaurants.map((restaurant) => {
    const restaurantOpinions = opinions.filter(
      (opinion) => opinion.restaurant.id === restaurant.id
    );

    const formattedOpinions = restaurantOpinions.map((opinion) => {
      const { id, comment, score, creationDate, user } = opinion;
      const formattedUser = {
        id: user.id,
        name: user.username,
      };

      return {
        id,
        comment,
        score,
        creationDate,
        user: formattedUser,
      };
    });

    return {
      id: restaurant.id,
      name: restaurant.restaurantName,
      address: restaurant.address,
      phone: restaurant.phone,
      terrace: restaurant.terrace,
      description: restaurant.description,
      type_food: restaurant.typeFood,
      score: restaurant.score,
      avg_price: restaurant.avgPrice,
      url: restaurant.url,
      img_profile: restaurant.imgProfile,
      img_gallery: restaurant.imgGallery,
      city: restaurant.city,
      latitude: restaurant.latitude,
      longitude: restaurant.longitude,
      status: restaurant.status,
      /* free_table_inside: restaurant.status === 0,
      free_table_in_terrace: restaurant.status === 0 && restaurant.terrace, */
      
      /* opinions: formattedOpinions, */
    };
  });

  res.send(formattedRestaurants);
};

export default getAllRestaurants;
