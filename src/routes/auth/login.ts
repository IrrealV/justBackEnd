import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { config } from "dotenv";
import { User } from "../../db/entity/user.js";
import { AppDataSource } from "../../db/data-source.js";
import bcrypt from "bcrypt";
import { Error } from "../../errors/error.response.js";

config();

const userRepo = AppDataSource.getRepository(User);

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const dbUser = await userRepo.findOneBy({
    email: email,
  });

  const result = await bcrypt.compare(password, dbUser.password);

  if (result) {
    const token = jsonwebtoken.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: "test",
      },
      process.env.JWT_SECRET
    );
    res.send({
      jwt: token,
    });
    return;
  }

  res
    .status(403)
    .send(
      Error.response(
        403,
        "Invalid credentials",
        "Credentials provided does not match with any account"
      )
    );
};

export default login;
