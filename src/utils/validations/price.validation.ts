import type { Context } from "hono";

export const customPriceZValidator = (schema) => async (c: Context, next: () => Promise<void>) => {
	const parsedBody = c.get("parsedBody");

	try {
		schema.parse(parsedBody);
		await next();
	} catch (error) {
		return c.json({ message: error.message }, 400);
	}
};
