import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Relation,
} from "typeorm";
import { User } from "./user.js";
import { Restaurant } from "./restaurant.js";

@Entity()
export class Opinion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: Relation<User>;

  @ManyToOne(() => Restaurant)
  @JoinColumn({ name: "restaurant_id" })
  restaurant: Relation<Restaurant>;

  @Column()
  comment: string;

  @Column()
  score: number;

  @Column()
  creationDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
