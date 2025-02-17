import { z } from "zod";

export const salesSchema = z.object({
	id: z.string().uuid(),
	companyId: z.string(),
	productId: z.string(),
	salesDate: z.date(),
	unitPrice: z.number().positive(),
	totalPrice: z.number().positive(),
	paymentMethod: z.string(),
	createdAt: z.date().default(new Date()),
	updatedAt: z.date().default(new Date()),
});

export type ISales = z.infer<typeof salesSchema>;
