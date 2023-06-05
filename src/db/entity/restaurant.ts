import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Table } from "./table.js";
import { Room } from "./room.js";
@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  restaurantName: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  terrace: boolean;

  @Column({
    type: "float",
    nullable: true,
    default: 0.0,
  })
  score: number;

  @Column("float")
  avgPrice: number;

  @Column()
  typeFood: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  imgProfile: string;

  @Column({ nullable: true })
  imgGallery: string;

  @Column({
    nullable: true,
    length: 1000,
  })
  description: string;

  @Column("double")
  latitude: number;

  @Column("double")
  longitude: number;

  @Column({ default: 0 })
  status: number;

  @OneToMany(() => Table, (table) => table.restaurant, {
    cascade: ["update"],
  })
  @JoinColumn({ name: "table_id" })
  table: Table[];

  @OneToMany(() => Room, (room) => room.restaurant, {
    cascade: ["update", "remove"],
  })
  @JoinColumn({ name: "room_id" })
  room: Room[];

}
