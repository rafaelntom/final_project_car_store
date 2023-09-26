import { AppDataSource } from "../data-source";
import { Address } from "../entities/address.entity";

export default AppDataSource.getRepository(Address);
