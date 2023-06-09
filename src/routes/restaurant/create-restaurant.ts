import { io } from "../../index.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { AppDataSource } from "../../db/data-source.js";
import { Restaurant } from "../../db/entity/restaurant.js";

const restaurantRepo = AppDataSource.getRepository(Restaurant);

const createRestaurant = async (req: Request, res: Response) => {
  const {
    restaurantName,
    phone,
    email,
    password,
    address,
    city,
    terrace,
    score,
    avgPrice,
    typeFood,
    url,
    imgProfile,
    imgGallery,
    description,
    latitude,
    longitude,
  } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  const restaurantToSave = await restaurantRepo.save({
    restaurantName,
    phone,
    email,
    password: encryptedPassword,
    address,
    profileImage: req.body.profileImage,
    city,
    terrace,
    score,
    avgPrice,
    typeFood,
    url,
    imgGallery,
    imgProfile,
    description,
    latitude,
    longitude
  });

  io.emit("createRestaurant", restaurantToSave);

  res.send({
    status: "exito",
    restaurant: restaurantToSave,
  });
};

export default createRestaurant;
