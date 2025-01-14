import type { Context } from "hono";
import { createUserService } from "../../services/users/userCreate.service";

export const createUserController = async (c: Context) => {
	try {
		const user = await createUserService(await c.req.json());

		return c.json(user, 201);
	} catch (err) {
		return c.json({ error: err.message }, 400);
	}
};
