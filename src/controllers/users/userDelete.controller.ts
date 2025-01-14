import type { Context } from "hono";
import { deleteUserService } from "../../services/users/userDelete.service";

export const deleteUserController = async (c: Context) => {
	const userId = c.req.param("id");

	try {
		await deleteUserService(userId);

		return c.json({ message: "User Deleted" }, 200);
	} catch (err) {
		return c.json({ message: err.message }, 404);
	}
};
