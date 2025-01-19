import type { Context } from "hono";
import { deleteProductService } from "../../services/products/productDelete.service";

export const deleteProductController = async (c: Context) => {
	const productId: string = c.req.param("id");
	try {
		await deleteProductService(productId);

		return c.json({ message: "Product Deleted" }, 200);
	} catch (err) {
		return c.json({ message: err.message }, 404);
	}
};
