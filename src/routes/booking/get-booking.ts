import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { Booking } from "../../db/entity/booking.js";

const bookingRepo = AppDataSource.getRepository(Booking);

const getBookingById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const booking = await bookingRepo.findOneBy({
    id: Number(id),
  });

  res.send(booking);
};

export default getBookingById;
