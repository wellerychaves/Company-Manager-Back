import type { Context } from "hono";
import { listProductService } from "../../services/products/productList.service";

export const listProductController = async (c: Context) => {
	try {
		const products = await listProductService();

		return c.json(products, 200);
	} catch (err) {
		return c.json({ error: err.message }, 400);
	}
};
