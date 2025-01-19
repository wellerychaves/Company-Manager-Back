import { eq } from "drizzle-orm";
import { db } from "../../database";
import { productsTable } from "../../database/schemas/products.schema";
import type { IProduct } from "../../interfaces/produtct.interface";

export const updatePrdoductService = async (productId: string, body: Partial<IProduct>) => {
	const updates: Partial<IProduct> = {};

	if (body.quantity) updates.quantity = body.quantity;
	if (body.price) updates.price = body.price;
	if (body.description) updates.description = body.description;

	if (Object.keys(updates).length === 0) {
		throw new Error("No valid property provided for update");
	}

	const product = await db.update(productsTable).set(updates).where(eq(productsTable.id, productId)).returning();

	return product;
};
