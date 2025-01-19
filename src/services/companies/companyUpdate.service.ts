import { eq } from "drizzle-orm";
import { db } from "../../database";
import { companiesTable } from "../../database/schemas/companies.schema";
import type { ICompany } from "../../interfaces/company.interface";

export const updateCompanyService = async (companyId: string, body: Partial<ICompany>) => {
	const updates: Partial<ICompany> = {};

	if (body.companyName) updates.companyName = body.companyName;
	if (body.companyEmail) updates.companyEmail = body.companyEmail;
	if (body.contactPhone) updates.contactPhone = body.contactPhone;
	if (body.address) updates.address = body.address;
	if (body.description) updates.description = body.description;
	if (body.location) updates.location = body.location;
	if (body.status) updates.status = body.status;

	if (Object.keys(updates).length === 0) {
		throw new Error("No valid property provided for update");
	}

	const company = await db.update(companiesTable).set(updates).where(eq(companiesTable.id, companyId));

	return company;
};
