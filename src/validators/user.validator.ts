import { check } from "express-validator";
import validateResult from "../middlewares/validateHelper.js";
import { Request, Response, NextFunction } from "express";

const validateNewUser = [
  check("username").exists(),

  check("email").optional().isEmail(),

  check("phoneNumber").exists(),

  check("password").exists(),

  check("role").exists().isInt({ min: 0, max: 10 }),

  check("profileImage").optional(),

  check("device").exists(),

  check("token").exists(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export default validateNewUser;
