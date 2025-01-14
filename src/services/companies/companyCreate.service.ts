import { eq } from "drizzle-orm";
import { db } from "../../database";
import { companiesTable } from "../../database/schemas/companies.schema";
import {
	type ICreateCompanySchema,
	createCompanySchema,
} from "../../interfaces/company.interface";

export const createCompanyService = async (input: ICreateCompanySchema) => {
	const validation = createCompanySchema.safeParse(input);

	if (!validation.success) {
		throw new Error(`Validation error: ${validation.error.message}`);
	}
	const emailAlreadyExists = await db
		.select()
		.from(companiesTable)
		.where(eq(companiesTable.companyEmail, input.companyName));

	if (emailAlreadyExists.length >= 1) {
		throw new Error("This email is already being used");
	}
	const newCompanyData = {
		id: Bun.randomUUIDv7(),
		userId: input.userId,
		companyName: input.companyName,
		companyEmail: input.companyEmail,
		contactPhone: input.companyPhone,
		description: input.description ?? null,
		address: input.address,
	};

	const query = await db
		.insert(companiesTable)
		.values(newCompanyData)
		.returning();

	return query;
};
