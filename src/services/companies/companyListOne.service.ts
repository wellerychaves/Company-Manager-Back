import { eq } from "drizzle-orm";
import { db } from "../../database";
import { companiesTable } from "../../database/schemas/companies.schema";

export const listOneCompanyService = async (companyId: string) => {
	const user = await db
		.select()
		.from(companiesTable)
		.where(eq(companiesTable.id, companyId));

	if (user.length === 0) {
		throw new Error("Company does not exist in database");
	}

	return user;
};
