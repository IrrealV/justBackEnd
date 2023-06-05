import { check } from "express-validator";
import validateResult from "../middlewares/validateHelper.js";
import { Request, Response, NextFunction } from "express";


const validateNewRestaurant = [

  check("restaurantName").notEmpty(),

  check("phone").notEmpty(),

  check("email").notEmpty().isEmail(),

  check("password").notEmpty().isStrongPassword({ minLength: 8 }),

  check("address").notEmpty(),

  check("city").notEmpty(),

  check("terrace").isBoolean(),

  check("score").isNumeric(),

  check("avgPrice").isNumeric(),

  check("typeFood").notEmpty(),

  check("url").optional().isURL(),

  check("imgProfile").optional().isURL(),

  check("imgGallery").optional().isURL(),

  check("description").optional().isLength({ max: 1000 }),

  check("latitude").isNumeric(),

  check("longitude").isNumeric(),

  check("status").isInt(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export default validateNewRestaurant;
