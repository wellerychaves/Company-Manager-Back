import type { Context } from "hono";
import { listOneCompanyService } from "../../services/companies/companyListOne.service";

export const listOneCompanyController = async (c: Context) => {
	const companyId = c.req.param("id");

	try {
		const user = await listOneCompanyService(companyId);

		return c.json(user, 200);
	} catch (err) {
		return c.json({ message: err.message }, 404);
	}
};
