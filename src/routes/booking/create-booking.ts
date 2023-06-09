import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { Table } from "../../db/entity/table.js";
import { Restaurant } from "../../db/entity/restaurant.js";
import { Booking } from "../../db/entity/booking.js";

const bookingRepo = AppDataSource.getRepository(Booking);
const restaurantRepo = AppDataSource.getRepository(Restaurant);
const tableRepo = AppDataSource.getRepository(Table);

const createBooking = async (req: Request, res: Response) => {
  const {
    peopleAmount,
    bookingCreation,
    estimated,
    state,
    user,
    restaurant,
    table,
  } = req.body;

  const restaurantToFind = await restaurantRepo.findOneBy({
    id: Number(restaurant),
  });

  const tableToFind = await tableRepo.findOneBy({ id: Number(table) });

  if (!restaurantToFind) {
    return res.status(404).send("Restaurante no encontrado");
  }
  if (!tableToFind) {
    return res.status(404).send("Mesa no encontrada");
  }

  const createdBooking = await bookingRepo.save({
    peopleAmount,
    bookingCreation,
    estimated,
    state,
    user,
    restaurant,
    table,
  });

  res.send({
    success: "Booking created successfully",
  });
};

export default createBooking;
