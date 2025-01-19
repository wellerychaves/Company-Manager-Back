import { z } from "zod";
import { timestampsZod } from "../database/helpers/timestamps.helpers";

export const companySchema = z.object({
	id: z.string().uuid(),
	userId: z.string(),
	companyName: z.string(),
	companyEmail: z.string().email("Invalid E-mail"),
	contactPhone: z.string(),
	address: z.string(),
	description: z.string(),
	location: z.string().optional(),
	status: z.boolean().default(false),
	...timestampsZod,
});

export const createCompanySchema = companySchema.pick({
	userId: true,
	companyName: true,
	companyEmail: true,
	contactPhone: true,
	address: true,
	description: true,
	location: true,
});

export type ICompany = z.infer<typeof companySchema>;
export type ICreateCompanySchema = z.infer<typeof createCompanySchema>;
