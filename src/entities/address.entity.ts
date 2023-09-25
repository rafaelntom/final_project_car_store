import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("adresses")
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 9, nullable: false })
  zip_code: string;

  @Column({ type: "varchar", length: 4, nullable: false })
  state: string;

  @Column({ type: "varchar", length: 40, nullable: false })
  street: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  number: string;

  @Column({ type: "varchar", length: 30, nullable: true })
  complement: string;

  @OneToOne(() => User, (user) => user.address)
  user: User;
}
