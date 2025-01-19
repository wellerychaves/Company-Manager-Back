import { z } from "zod";
import { timestampsZod } from "../database/helpers/timestamps.helpers";

export const userSchema = z.object({
	id: z.string().uuid(),
	firstName: z.string(),
	secondName: z.string(),
	email: z.string().email("Invalid E-mail"),
	password: z.string(),
	isAdmin: z.boolean().default(false),
	...timestampsZod,
});

export const createUserSchema = userSchema.pick({
	firstName: true,
	secondName: true,
	email: true,
	password: true,
});

export const userLoginSchema = userSchema.pick({
	email: true,
	password: true,
});

export type IUser = z.infer<typeof userSchema>;
export type ICreateUserSchema = z.infer<typeof createUserSchema>;
export type IUserLoginSchema = z.infer<typeof userLoginSchema>;
