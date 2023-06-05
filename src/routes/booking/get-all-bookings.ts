import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { Booking } from "../../db/entity/booking.js";

const bookingRepo = AppDataSource.getRepository(Booking)

const getAllbookings =async (req:Request, res: Response) => {
    const Bookings = await bookingRepo.find()

    res.send(Bookings)
}

export default getAllbookings