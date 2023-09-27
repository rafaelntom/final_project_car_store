import { AppDataSource } from "../data-source";
import { Image } from "../entities/images.entity";

export default AppDataSource.getRepository(Image);
