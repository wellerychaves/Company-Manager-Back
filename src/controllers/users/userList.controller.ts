import type { Context } from "hono";
import { listUserService } from "../../services/users/userList.service";

export const listUserController = async (c: Context) => {
	const users = await listUserService();

	return c.json(users, 200);
};
