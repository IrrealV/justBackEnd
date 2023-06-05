import { ExpressValidator, check } from "express-validator";
import validateResult from "../middlewares/validateHelper.js";
import { Request, Response, NextFunction } from "express";

const validateNewRoom = [
  check("tableAmount").exists().isInt({ min: 0 }),

  check("name").exists(),

  check("state").exists().isInt(),

  check("terrace").exists().isBoolean().toBoolean(),
  
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export default validateNewRoom;
