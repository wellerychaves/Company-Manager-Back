import type { Context } from "hono";
import { listUserService } from "../../services/users/userList.service";

export const listUserController = async (c: Context) => {
	try {
		const users = await listUserService();

		return c.json(users, 200);
	} catch (err) {
		return c.json({ error: err.message }, 400);
	}
};
