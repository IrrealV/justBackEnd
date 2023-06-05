import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { User } from "../../db/entity/user.js";

const usersRepo = AppDataSource.getRepository(User);

const updateUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const {
    username,
    email,
    phoneNumber,
    password,
    role,
    profileImage,
    device,
    token,
  } = req.body;

  // Buscar el usuario a actualizar por su ID
  const userToUpdate = await usersRepo.findOneBy({ id: Number(id) });

  if (!userToUpdate) {
    return res.status(404).send("User not found");
  }

  // Actualizar los campos del usuario con los valores nuevos
  userToUpdate.username = username;
  userToUpdate.email = email;
  userToUpdate.phoneNumber = phoneNumber;
  userToUpdate.password = password;
  userToUpdate.role = role;
  userToUpdate.profileImage = profileImage;
  userToUpdate.device = device;
  userToUpdate.token = token;

  // Guardar los cambios en la base de datos
  const updatedUser = await usersRepo.save(userToUpdate);

  res.send({
    status: "success",
    user: updatedUser,
  });
};

export default updateUserById;
