import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("announcements")
export default class Announcement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 40, nullable: false })
  brand: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  model: string;

  @Column({ type: "varchar", length: 4, nullable: false })
  year: string;

  @Column({ type: "varchar", length: 15, nullable: false })
  fuel_type: string;

  @Column({ type: "varchar", length: 10, nullable: false })
  milage: string;

  @Column({ type: "varchar", length: 15, nullable: false })
  color: string;

  @Column({ type: "decimal", precision: 12, scale: 2, nullable: false })
  price_fipe: number | string;

  @Column({ type: "decimal", precision: 12, scale: 2, nullable: false })
  price: number | string;

  @Column({ type: "text", length: 15 })
  description: string;

  @ManyToOne(() => User, (u) => u.announcement)
  user: User;
}
