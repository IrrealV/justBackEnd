import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { Table } from "../../db/entity/table.js";
import { Restaurant } from "../../db/entity/restaurant.js";
import { Booking } from "../../db/entity/booking.js";
import { User } from "../../db/entity/user.js";

const bookingRepo = AppDataSource.getRepository(Booking);
const restaurantRepo = AppDataSource.getRepository(Restaurant);
const tableRepo = AppDataSource.getRepository(Table);
const userRepo = AppDataSource.getRepository(User);

const createBooking = async (req: Request, res: Response) => {
  const {
    peopleAmount,
    bookingCreation,
    estimated,
    state,
    user_id,
    restaurant_id,
    table_id,
  } = req.body;

  const restaurantToFind = await restaurantRepo.findOneBy({
    id: Number(restaurant_id),
  });

  const tableToFind = await tableRepo.findOneBy({ id: Number(table_id) });

  if (!restaurantToFind) {
    return res.status(404).send("Restaurante no encontrado");
  }
  if (!tableToFind) {
    return res.status(404).send("Mesa no encontrada");
  }

  const userToFind = await userRepo.findOneBy({ id: Number(user_id) });

  if (!userToFind) {
    return res.status(404).send("Usuario no encontrado");
  }

  const booking = new Booking();
  booking.peopleAmount = peopleAmount;
  booking.bookingCreation = bookingCreation;
  booking.estimated = estimated;
  booking.state = state;
  booking.user = userToFind;
  booking.restaurant = restaurantToFind;
  booking.table = tableToFind;

  const createdBooking = await bookingRepo.save(booking);

  res.send({
    success: "Reserva creada con éxito",
    Reserva: createdBooking
  });
};

export default createBooking;

