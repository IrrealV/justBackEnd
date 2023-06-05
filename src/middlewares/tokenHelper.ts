import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    // Obtener el token del encabezado de la solicitud
    const token = req.headers.authorization?.split(" ")[1];

  if (req.path != "/login" && req.path != "/register"){
    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }
    // Verificar y decodificar el token
    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
      next();
    });
  }
    
  };
  
  export default verifyToken;