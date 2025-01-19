import { eq } from "drizzle-orm";
import { db } from "../../database";
import { companiesTable } from "../../database/schemas/companies.schema";
import { productsTable } from "../../database/schemas/products.schema";

export const listOneProductService = async (productId: string) => {
	try {
		const product = await db.select().from(companiesTable).where(eq(productsTable.id, productId));

		if (product.length === 0) {
			throw new Error("This product does not exist in database");
		}
		return product;
	} catch (err) {
		throw new Error(`${err.message}`);
	}
};
