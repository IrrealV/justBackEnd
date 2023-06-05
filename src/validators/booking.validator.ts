import { ExpressValidator, check } from "express-validator";
import validateResult from "../middlewares/validateHelper.js";
import { Request, Response, NextFunction } from "express";
import { Table } from "../db/entity/table.js";

const validateNewBooking = [
  check("peopleAmount").exists().isInt({ min: 1 }).toInt(),

  check("bookingCreation").exists().isISO8601(),

  check("estimated").exists(),

  check("state").optional().isInt(),

  check("user_id").exists(),

  check("restaurant_id").exists(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export default validateNewBooking;
