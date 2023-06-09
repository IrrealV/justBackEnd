import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { Booking } from "../../db/entity/booking.js";
import { User } from "../../db/entity/user.js";

const bookingRepo = AppDataSource.getRepository(Booking);
const userRepo = AppDataSource.getRepository(User);

const getBookingByuser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const userToFind = await userRepo.findOneBy({ id: Number(id) });

  if (!userToFind) {
    return res.status(404).send("Usuario no encontrado");
  }

  const bookingFromUser = await bookingRepo.find({
    where: {
      user: userToFind,
    },
  });

  res.send(bookingFromUser);
};

export default getBookingByuser;
