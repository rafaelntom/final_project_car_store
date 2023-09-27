import { AppDataSource } from "../data-source";
import { Announcement } from "../entities/announcement.entity";

export default AppDataSource.getRepository(Announcement);
