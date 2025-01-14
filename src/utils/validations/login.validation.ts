import { userLoginSchema } from "../../interfaces/user.interface";

export const loginValidation = async (c) => {
	const credentials = await c.req.json();
	//console.log(credentials, c);

	const parsed = userLoginSchema.safeParse(credentials);
	if (!parsed.success) {
		return c.text("inválido", 400);
	}
	return parsed.data;
};
