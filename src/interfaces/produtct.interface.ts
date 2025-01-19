import { z } from "zod";
import { timestampsZod } from "../database/helpers/timestamps.helpers";

export const productSchema = z.object({
	id: z.string().uuid(),
	companyId: z.string(),
	productName: z.string(),
	quantity: z.number().int().positive(),
	price: z.bigint().positive(),
	description: z.string(),
	...timestampsZod,
});

export const createProductSchema = productSchema.pick({
	companyId: true,
	productName: true,
	quantity: true,
	price: true,
	description: true,
});

export type IProduct = z.infer<typeof productSchema>;
export type ICreateProductSchema = z.infer<typeof createProductSchema>;
