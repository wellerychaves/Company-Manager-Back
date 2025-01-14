import { Hono } from "hono";

export const product = new Hono();

product.get("/", (c) => c.json({ message: "List of products" }));
product.notFound((c) => {
	return c.text("Product doesn't exists", 404);
});
