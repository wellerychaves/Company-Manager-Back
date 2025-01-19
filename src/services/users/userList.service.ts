import { db } from "../../database/index";
import { usersTable } from "../../database/schemas/users.schema";

export const listUserService = async () => {
	try {
		const users = db.select().from(usersTable);

		return users;
	} catch (err) {
		throw new Error(`${err.message}`);
	}
};
