import { check } from "express-validator";
import validateResult from "../middlewares/validateHelper.js";
import { Request, Response, NextFunction } from "express";


const validateNewTable = [
  
  check("state").exists().isInt(),

  check("room").exists().isInt(),

  check("restaurant").exists().isInt(),
  
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },

];

export default validateNewTable;
