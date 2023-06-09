import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { Booking } from "../../db/entity/booking.js";
import { Restaurant } from "../../db/entity/restaurant.js";

const bookingRepo = AppDataSource.getRepository(Booking);
const restaurantRepo = AppDataSource.getRepository(Restaurant);

const getBookingByRestaurant = async (req: Request, res: Response) => {
  const { id } = req.params;

  const restaurantToFind = await restaurantRepo.findOneBy({ id: Number(id) });

  if (!restaurantToFind) {
    return res.status(404).send("Restaurante no encontrada");
  }

  const bookingFromRestaurant = await bookingRepo.find({
    where: {
      restaurant: restaurantToFind,
    },
  });

  res.send(bookingFromRestaurant);
};

export default getBookingByRestaurant;
