import type { Context } from "hono";
import { listCompaniesService } from "../../services/companies/companyList.service";

export const listCompaniesController = async (c: Context) => {
	try {
		const companies = await listCompaniesService();

		return c.json(companies, 200);
	} catch (err) {
		return c.json({ error: err.message }, 400);
	}
};
