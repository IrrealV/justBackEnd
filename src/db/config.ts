import { config } from "dotenv";

config();

const dataConnection = {
  host: process.env.HOST || "",
  port: process.env.PORT || "",
  database: process.env.DATABASE || "",
  db_user: process.env.DB_USER || "",
  db_passwd: process.env.DB_PASSWORD || "",
  sync: process.env.SYNCRONIZE || "",
  log: process.env.LOGGIN || "",
};

export default dataConnection;
