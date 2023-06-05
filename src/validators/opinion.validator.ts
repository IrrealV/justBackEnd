import { check } from "express-validator";
import validateResult from "../middlewares/validateHelper.js";
import { Request, Response, NextFunction } from "express";

const validateNewOpinion = [

  check("comment").exists(),

  check("score").exists().isInt({ min: 0, max: 5 }).toInt(),

  check("creationDate").exists().isISO8601(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export default validateNewOpinion;
