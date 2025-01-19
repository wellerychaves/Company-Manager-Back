import type { Context } from "hono";
import { updateCompanyService } from "../../services/companies/companyUpdate.service";

export const updateCompanyController = async (c: Context) => {
	const companyId: string = c.req.param("id");
	const body = await c.req.json();

	try {
		const updatedCompany = await updateCompanyService(companyId, body);

		return c.json(updatedCompany, 200);
	} catch (err) {
		return c.json({ message: err.message }, 400);
	}
};
