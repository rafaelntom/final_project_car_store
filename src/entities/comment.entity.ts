import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Announcement } from "./announcement.entity";
import { User } from "./user.entity";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  description: string;

  @CreateDateColumn({ type: "date" })
  created_at: Date | string;

  @ManyToOne(() => Announcement, (announcement) => announcement.comments, {
    onDelete: "CASCADE",
  })
  announcement: Announcement;

  @ManyToOne(() => User)
  user: User;
}
