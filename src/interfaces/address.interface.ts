import { z } from "zod";
import { AddressSchema } from "../schemas/address.schema";

type TAddress = z.infer<typeof AddressSchema>;

export { TAddress };
