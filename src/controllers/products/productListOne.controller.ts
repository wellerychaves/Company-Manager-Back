import type { Context } from "hono";
import { listOneProductService } from "../../services/products/productListOne.service";

export const listOneProductController = async (c: Context) => {
	const productId: string = c.req.param("id");

	try {
		const product = await listOneProductService(productId);

		return c.json(product, 200);
	} catch (err) {
		return c.json({ message: err.message }, 404);
	}
};
