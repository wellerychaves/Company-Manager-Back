import type { Context } from "hono";
import { createCompanyService } from "../../services/companies/companyCreate.service";

export const createCompanyController = async (c: Context) => {
	try {
		const company = await createCompanyService(await c.req.json());

		return c.json(company, 201);
	} catch (err) {
		return c.json({ error: err.message }, 400);
	}
};
