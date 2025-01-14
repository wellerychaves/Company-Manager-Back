import { eq } from "drizzle-orm";
import { sign } from "hono/jwt";
import { db } from "../../database";
import { usersTable } from "../../database/schemas/users.schema";
import { verifyPassword } from "../../utils/passwordUtils";

export const userLoginService = async (email: string, password: string) => {
	const secretPhrase: string = process.env.SECRET_PHRASE;
	const [user] = await db
		.select()
		.from(usersTable)
		.where(eq(usersTable.email, email));

	const storedUserPassword = user.password;

	const validatePassword = await verifyPassword(password, storedUserPassword);

	if (!validatePassword) {
		throw new Error("Incorrect E-mail or password");
	}

	const payload = {
		exp: Math.floor(Date.now() / 1000) + 60 * 20,
		name: user.firstName,
		sub: user.id,
	};

	const token = sign(payload, secretPhrase);

	return token;
};
