import { DataSource } from "typeorm";
import { User } from "./entity/user.js";
import { Restaurant } from "./entity/restaurant.js";
import { Booking } from "./entity/booking.js";
import { Table } from "./entity/table.js";
import { Room } from "./entity/room.js";
import { Opinion } from "./entity/opinion.js";
import config from "./config.js";

const sync = config.sync === "true";
const log = config.log === "true";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: config.host,
  port: parseInt(config.port),
  username: config.db_user,
  password: config.db_passwd,
  database: config.database,
  synchronize: sync,
  logging: log,
  entities: [User, Restaurant, Booking, Room, Table, Opinion],
  subscribers: [],
  migrations: [],
});
