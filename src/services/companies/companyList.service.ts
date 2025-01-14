import { db } from "../../database";
import { companiesTable } from "../../database/schemas/companies.schema";

export const listCompaniesService = async () => {
	const companies = db.select().from(companiesTable);

	return companies;
};
