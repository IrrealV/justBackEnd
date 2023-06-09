import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { Booking } from "../../db/entity/booking.js";

const bookingRepo = AppDataSource.getRepository(Booking);

const updateBookingById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const {peopleAmount, state, table, restaurant } = req.body;

  const bookingToUpdate = await bookingRepo.findOneBy({ id: Number(id) });

  if (!bookingToUpdate) {
    return res.status(404).send("Reserva no encontrada");
  }

  bookingToUpdate.state = state;
  bookingToUpdate.restaurant = restaurant;
  bookingToUpdate.table = table;
  bookingToUpdate.peopleAmount = peopleAmount;

  const updatedbooking = await bookingRepo.save(bookingToUpdate);

  res.send({
    status: "Reserva actualizada con exito",
    booking: updatedbooking,
  });
};

export default updateBookingById;
