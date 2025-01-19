import { z } from "zod";

export const salesSchema = z.object({
	id: z.string().uuid(),
	productId: z.string(),
	salesDate: z.date(),
	salePrice: z.number().positive(),
	systemCommission: z.number().positive(),
	createdAt: z.date().default(new Date()),
	updatedAt: z.date().default(new Date()),
});

export type ISales = z.infer<typeof salesSchema>;
