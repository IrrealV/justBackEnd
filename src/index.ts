import { AppDataSource } from "./db/data-source.js";
import { Server } from "socket.io";
import "reflect-metadata";
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import routes from "./routes/routes.js";
import cors from "cors";

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use(routes);

// Database
AppDataSource.initialize();

// Port & ip
const port = process.env.PORT || 3000;

app.listen(Number(port),"0.0.0.0", () => {
  console.log(`Servidor escuchando en el puerto ${port}}`);
});
