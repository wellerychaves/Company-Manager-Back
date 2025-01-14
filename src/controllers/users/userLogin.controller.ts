import type { Context } from "hono";
import { userLoginService } from "../../services/users/userLogin.service";

export const userLoginController = async (c: Context) => {
	const { email, password } = await c.req.json();

	try {
		const token = await userLoginService(email, password);

		return c.json({ token }, 200);
	} catch (err) {
		return c.json({ message: err.message }, 404);
	}
};
