import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { Restaurant } from "./restaurant.js";
import { Room } from "./room.js";

@Entity()
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default : 0,
  })
  state: number;

  @ManyToOne(() => Room, (room) => room.table, {
    cascade : ['remove'],
  })
  @JoinColumn({ name : 'room_id'})
  room: Room;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.table,{
    cascade : ['remove']
  })
  @JoinColumn({ name : 'restaurant_id'})
    restaurant: Relation<Restaurant>;

}
