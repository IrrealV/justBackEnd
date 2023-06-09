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

  if (!dbUser.isVerified) {
    res.send({
      error: "El email de este usuario aun no ha sido verificado",
    });
    return;
  }else if(!dbUser){
    res.send({
      error: "Usuario no encontrado, porfavor registrese",
    });
  }

  const result = await bcrypt.compare(password, dbUser.password);

  if (result) {
    const token = jsonwebtoken.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
        data: "test",
      },
      process.env.JWT_SECRET
    );
    res.send({
      token: token,
    });
    return;
  }

  res
    .status(403)
    .send(
      Error.response(
        403,
        "Credenciales invalidas",
        "La credenciales proporcionadas no corresponden a ninguna cuenta"
      )
    );
};

export default login;
