import { db } from "../../database/index";
import { usersTable } from "../../database/schemas/users.schema";
export const listUserService = async () => {

	const users = db.select().from(usersTable);

	return users
};
