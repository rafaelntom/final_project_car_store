import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Announcement } from "./announcement.entity";

@Entity("images")
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  img_url: string;

  @ManyToOne(() => Announcement, (a) => a.images, { onDelete: "CASCADE" })
  announcement: Announcement;
}
