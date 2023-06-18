import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { User } from "./user.js";
import { Restaurant } from "./restaurant.js";
import { Table } from "./table.js";

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  peopleAmount: number;

  @Column()
  bookingCreation: Date;

  @Column()
  estimated:number;

  @Column({
    default: 0,
    nullable: true,
  })
  state: number;

  @OneToOne(() => User, (user) => user.booking,{
    cascade: ["remove"],
  })
  @JoinColumn({ name: "user_id" })
  user: Relation<User>;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.booking,{
    cascade: ["remove"],
  })
  @JoinColumn({ name: "restaurant_id" })
  restaurant: Relation<Restaurant>;

  @OneToOne(() => Table, {
    nullable: true,
  })
  @JoinColumn({ name: "table_id" })
  table: Relation<Table>;
}
