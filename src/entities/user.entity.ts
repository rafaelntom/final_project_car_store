import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "./address.entity";
import { Announcement } from "./announcement.entity";
import { Comment } from "./comment.entity";

enum AccountType {
  Comprador = "Comprador",
  Anunciante = "Anunciante",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "boolean" })
  is_seller: boolean;

  @Column({ type: "varchar", length: 70, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  password: string;

  @Column({ type: "varchar", length: 60, nullable: false, unique: true })
  email: string;

  @Column({ type: "varchar", length: 14, nullable: false, unique: true })
  cpf: string;

  @Column({ type: "varchar", length: 15, nullable: false })
  phone: string;

  @Column({ type: "date", nullable: false })
  birth_date: Date;

  @Column({ type: "varchar", length: 150, nullable: true })
  description: string | null;

  @OneToOne(() => Address, (address) => address.user)
  @JoinColumn()
  address: Address;

  @OneToMany(() => Announcement, (a) => a.user)
  announcement: Announcement[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comment: Comment[];
}
