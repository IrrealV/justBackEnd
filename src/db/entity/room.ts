import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { Restaurant } from "./restaurant.js";
import { Table } from "./table.js";

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tableAmount: number;

  @Column()
  name: string;

  @Column()
  state: number;

  @Column()
  terrace: boolean;

  @OneToMany(() => Table, (table) => table.room,{
    cascade: ['update'],
  })
  @JoinColumn({ name: "table_id"})
  table: Table[];

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.room,{
    cascade: ['update']
  })
  @JoinColumn({ name: "restaurant_id"})
  restaurant: Relation<Restaurant>;
}
