import type { Context } from "hono";
import { updateUserService } from "../../services/users/userUpdate.service";

export const updateUserController = async (c: Context) => {
	const userId: string = c.req.param("id");
	const body = await c.req.json();

	try {
		const updatedUser = await updateUserService(userId, body);

		return c.json(updatedUser, 200);
	} catch (err) {
		return c.json({ message: err.message }, 400);
	}
};
