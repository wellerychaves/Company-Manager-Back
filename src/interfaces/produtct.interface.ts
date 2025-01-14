import { z } from "zod";

export const productSchema = z.object({
	id: z.string().uuid(),
	companyId: z.string(),
	productName: z.string(),
	quantity: z.number().int(),
	price: z.number().positive(),
	location: z.string().optional(),
	createdAt: z.date().default(new Date()),
	updatedAt: z.date().default(new Date()),
});

export type Iproduct = z.infer<typeof productSchema>;
