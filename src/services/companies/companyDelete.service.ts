import { eq } from "drizzle-orm";
import { db } from "../../database";
import { companiesTable } from "../../database/schemas/companies.schema";

export const deleteCompanyService = async (companyId: string) => {
	const company = await db
		.delete(companiesTable)
		.where(eq(companiesTable.id, companyId))
		.returning();

	if (company.length === 0) {
		throw new Error("Company does not exist in database");
	}

	return company;
};
