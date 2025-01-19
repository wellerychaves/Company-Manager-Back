import type { Context } from "hono";
import type { ICreateCompanySchema } from "../../interfaces/company.interface";
import { createCompanyService } from "../../services/companies/companyCreate.service";

export const createCompanyController = async (c: Context) => {
	const data: ICreateCompanySchema = await c.req.json();

	try {
		const company = await createCompanyService(data);

		return c.json(company, 201);
	} catch (err) {
		return c.json({ error: err.message }, 400);
	}
};
