import type { Context } from "hono";
import { deleteCompanyService } from "../../services/companies/companyDelete.service";

export const deleteCompanyController = async (c: Context) => {
	const companyId = c.req.param("id");

	try {
		await deleteCompanyService(companyId);

		return c.json({ message: "Company Deleted" }, 200);
	} catch (err) {
		return c.json({ message: err.message }, 404);
	}
};
