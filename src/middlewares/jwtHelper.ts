import { expressjwt } from "express-jwt";
import { config } from "dotenv";

config();

const jwt = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
}).unless({ //Rutas o endpoint para los que no se requieren tokens para acceder a ellos
  path: [
    "/api/v1/login",
    "/api/v1/register",
    "/api/v1/reset-password-request",
    "/api/v1/reset-password",
    "/api/v1/verify-user",
  ],
});

export default jwt;
