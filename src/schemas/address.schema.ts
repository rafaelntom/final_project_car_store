import { z } from "zod";

const AddressSchema = z.object({
  zip_code: z.string().min(8).max(9).nonempty(),
  state: z
    .string()
    .min(1)
    .max(4, {
      message:
        "When typing a state use abreviations, São Paulo: SP, Rio de Janeiro: RJ",
    })
    .nonempty(),
  street: z.string().min(1).max(40).nonempty(),
  number: z.string().min(1).max(20).nullable(),
  complement: z.string().min(1).max(30).nullable(),
});

export { AddressSchema };
