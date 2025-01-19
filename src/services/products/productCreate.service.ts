import { eq } from "drizzle-orm";
import { db } from "../../database";
import { companiesTable } from "../../database/schemas/companies.schema";
import { productsTable } from "../../database/schemas/products.schema";
import { type ICreateProductSchema, createProductSchema } from "../../interfaces/produtct.interface";

export const createProductService = async (data: ICreateProductSchema) => {
	const validation = createProductSchema.safeParse(data);

	if (!validation.success) {
		throw new Error(`Validation error: ${validation.error.message}`);
	}

	const validateCompanyId = await db.select().from(companiesTable).where(eq(companiesTable.id, data.companyId));

	if (validateCompanyId.length === 0) {
		throw new Error("This company does not exist in the database");
	}

	const newProductData = {
		id: Bun.randomUUIDv7(),
		companyId: data.companyId,
		productName: data.productName,
		quantity: data.quantity,
		price: data.price,
		description: data.description ?? null,
	};

	const query = await db.insert(productsTable).values(newProductData).returning();

	return query;
};
