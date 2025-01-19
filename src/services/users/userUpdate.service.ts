import { eq } from "drizzle-orm";
import { db } from "../../database";
import { usersTable } from "../../database/schemas/users.schema";
import type { IUser } from "../../interfaces/user.interface";

export const updateUserService = async (userId: string, body: Partial<IUser>) => {
	const updates: Partial<IUser> = {};

	if (body.firstName) updates.firstName = body.firstName;
	if (body.secondName) updates.secondName = body.secondName;

	if (Object.keys(updates).length === 0) {
		throw new Error("No valid property provided for update");
	}

	const user = await db.update(usersTable).set(updates).where(eq(usersTable.id, userId)).returning();
	// fazer tratativa caso user retorne um erro

	return user;
};
