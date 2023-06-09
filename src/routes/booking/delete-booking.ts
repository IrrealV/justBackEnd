import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { Booking } from "../../db/entity/booking.js";

const bookingRepo = AppDataSource.getRepository(Booking);

const deleteBookingById = async (req: Request, res: Response) => {
  const id = req.params.id;

  const bookingToDelelte = await bookingRepo.delete({
    id: Number(id),
  });

  res.send({
    status: "Mesa borrada con exito",
    booking: bookingToDelelte,
  });
};

export default deleteBookingById;
