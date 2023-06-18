import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToOne,
  JoinColumn,
  Relation,
} from "typeorm";
import { randomBytes } from "crypto";
import { Booking } from "./booking.js";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({
    unique: true,
    nullable: true,
  })
  email: string;

  @Column({
    unique: true,
  })
  phoneNumber: string;

  @Column()
  password: string;

  @Column({
    type: "integer",
    default: 0,
    unsigned: true,
  })
  role: number;
  //El rol es un string de un numero, entre 0 y 10

  @Column({
    nullable: true,
  })
  profileImage: string;

  @Column()
  device: string;

  @Column()
  token: string;

  @Column()
  isVerified: boolean = false;

  @OneToOne(() => Booking, (booking) => booking.user,{
    cascade:["update"]
  })
  @JoinColumn({ name: "booking_id" })
  booking: Relation<Booking>;
  
}
