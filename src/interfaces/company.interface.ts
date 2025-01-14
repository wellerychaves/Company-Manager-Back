import { z } from "zod";
import { timestampsZod } from "../database/helpers/timestamps.helpers";

export const companySchema = z.object({
	id: z.string().uuid(),
	userId: z.string(),
	companyName: z.string(),
	companyEmail: z.string().email("Invalid E-mail"),
	companyPhone: z.string(),
	address: z.string(),
	description: z.string(),
	status: z.boolean().default(false),
	...timestampsZod,
});

export const createCompanySchema = companySchema.pick({
	userId: true,
	companyName: true,
	companyEmail: true,
	companyPhone: true,
	address: true,
	description: true,
});

export type ICompany = z.infer<typeof companySchema>;
export type ICreateCompanySchema = z.infer<typeof createCompanySchema>;
