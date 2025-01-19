import { db } from "../../database";
import { productsTable } from "../../database/schemas/products.schema";

export const listProductService = async () => {
	try {
		const products = await db.select().from(productsTable);

		return products;
	} catch (err) {
		throw new Error(`${err.message}`);
	}
};
