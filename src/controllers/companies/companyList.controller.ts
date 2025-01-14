import type { Context } from "hono";
import { listCompaniesService } from "../../services/companies/companyList.service";

export const listCompaniesController = async (c: Context) => {
	const companies = await listCompaniesService();

	return c.json(companies, 200);
};
