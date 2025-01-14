import type { Context } from "hono";
import { listOneUserService } from "../../services/users/userListOne.service";

export const listOneUserController = async (c: Context) => {
	const userId = c.req.param("id");

	try {
		const user = await listOneUserService(userId);

		return c.json(user, 200);
	} catch (err) {
		return c.json({ message: err.message }, 404);
	}
};
