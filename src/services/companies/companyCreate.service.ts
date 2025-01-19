import { eq } from "drizzle-orm";
import { db } from "../../database";
import { companiesTable } from "../../database/schemas/companies.schema";
import { usersTable } from "../../database/schemas/users.schema";
import { type ICreateCompanySchema, createCompanySchema } from "../../interfaces/company.interface";

export const createCompanyService = async (data: ICreateCompanySchema) => {
	const validation = createCompanySchema.safeParse(data);

	if (!validation.success) {
		throw new Error(`Validation error: ${validation.error.message}`);
	}

	const validateUserId = await db.select().from(usersTable).where(eq(usersTable.id, data.userId));

	if (validateUserId.length === 0) {
		throw new Error("This user does not exist in the database");
	}
	const newCompanyData = {
		id: Bun.randomUUIDv7(),
		userId: data.userId,
		companyName: data.companyName,
		companyEmail: data.companyEmail,
		contactPhone: data.contactPhone,
		description: data.description ?? null,
		address: data.address,
	};

	const query = await db.insert(companiesTable).values(newCompanyData).returning();

	return query;
};
