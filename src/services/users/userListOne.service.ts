import { eq } from "drizzle-orm";
import { db } from "../../database";
import { usersTable } from "../../database/schemas/users.schema";

export const listOneUserService = async (userId: string) => {
	const user = await db.select().from(usersTable).where(eq(usersTable.id, userId));

	if (user.length === 0) {
		throw new Error("User does not exist in database.");
	}

	return user;
};
