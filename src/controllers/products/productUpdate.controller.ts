import type { Context } from "hono";
import { updatePrdoductService } from "../../services/products/productUpdate.service";

export const updateProductController = async (c: Context) => {
	const productId: string = c.req.param("id");
	const body = await c.req.json();

	try {
		const updatedProduct = await updatePrdoductService(productId, body);

		return c.json(updatedProduct, 200);
	} catch (err) {
		return c.json({ message: err.message }, 400);
	}
};
