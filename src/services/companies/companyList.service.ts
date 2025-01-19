import { db } from "../../database";
import { companiesTable } from "../../database/schemas/companies.schema";

export const listCompaniesService = async () => {
	try {
		const companies = db.select().from(companiesTable);

		return companies;
	} catch (err) {
		throw new Error(`${err.message}`);
	}
};
