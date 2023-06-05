import { check } from "express-validator";
import { Request, Response, NextFunction } from "express";
import validateResult from "../middlewares/validateHelper.js";

const validateCreate = [
  check("restaurantName").exists(),
  check("email").isEmail(),
  check("password").isStrongPassword({
    minLength: 8,
  }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export default validateCreate;
