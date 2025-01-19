import type { Context } from "hono";
import { listOneCompanyService } from "../../services/companies/companyListOne.service";

export const listOneCompanyController = async (c: Context) => {
	const companyId: string = c.req.param("id");

	try {
		const company = await listOneCompanyService(companyId);

		return c.json(company, 200);
	} catch (err) {
		return c.json({ message: err.message }, 404);
	}
};
