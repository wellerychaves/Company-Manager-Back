import { eq } from "drizzle-orm";
import { db } from "../../database";
import { productsTable } from "../../database/schemas/products.schema";

export const deleteProductService = async (productId: string) => {
	const product = await db.delete(productsTable).where(eq(productsTable.id, productId)).returning();

	if (product.length === 0) {
		throw new Error("This product does not exist in database");
	}

	return product;
};
