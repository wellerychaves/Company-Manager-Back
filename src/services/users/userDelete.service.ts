import { eq } from "drizzle-orm";
import { db } from "../../database";
import { companiesTable } from "../../database/schemas/companies.schema";
import { usersTable } from "../../database/schemas/users.schema";

export const deleteUserService = async (id: string) => {
	const companies = await db.select().from(companiesTable).where(eq(companiesTable.userId, id));

	if (companies.length > 0) {
		throw new Error("Cannot delete user with associated companies.");
	}

	const user = await db.delete(usersTable).where(eq(usersTable.id, id)).returning();

	if (user.length === 0) {
		throw new Error("User does not exist in database.");
	}

	return user;
};
