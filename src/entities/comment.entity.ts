import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Announcement } from "./announcement.entity";
import { User } from "./user.entity";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  description: string;

  @ManyToOne(() => Announcement, (announcement) => announcement.comment)
  announcement: Announcement;

  @ManyToOne(() => User)
  user: User;
}
