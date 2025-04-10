import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { createCompanySchema } from "../interfaces/company.interface";

import { createCompanyController } from "../controllers/companies/companyCreate.controller";
import { deleteCompanyController } from "../controllers/companies/companyDelete.controller";
import { listCompaniesController } from "../controllers/companies/companyList.controller";
import { listOneCompanyController } from "../controllers/companies/companyListOne.controller";
import { updateCompanyController } from "../controllers/companies/companyUpdate.controller";

export const company = new Hono();

company.get("/", (c) => listCompaniesController(c));
company.get("/:id", (c) => listOneCompanyController(c));
company.post("/", zValidator("json", createCompanySchema), (c) => createCompanyController(c));
company.patch("/:id", (c) => updateCompanyController(c));
company.delete("/:id", (c) => deleteCompanyController(c));

company.notFound((c) => {
	return c.text("Not Found", 404);
});
