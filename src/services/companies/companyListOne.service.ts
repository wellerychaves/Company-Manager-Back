import { eq } from "drizzle-orm";
import { db } from "../../database";
import { companiesTable } from "../../database/schemas/companies.schema";

export const listOneCompanyService = async (companyId: string) => {
	try {
		const company = await db.select().from(companiesTable).where(eq(companiesTable.id, companyId));

		if (company.length === 0) {
			throw new Error("This company does not exist in database");
		}
		return company;
	} catch (err) {
		throw new Error(`${err.message}`);
	}
};
