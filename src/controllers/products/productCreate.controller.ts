import type { Context } from "hono";
import type { ICreateProductSchema } from "../../interfaces/produtct.interface";
import { createProductService } from "../../services/products/productCreate.service";

export const createProductController = async (c: Context) => {
	const data: ICreateProductSchema = await c.req.json();

	try {
		const product = await createProductService(data);

		return c.json(product, 201);
	} catch (err) {
		return c.json({ error: err.message }, 400);
	}
};
