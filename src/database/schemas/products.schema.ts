import { relations } from "drizzle-orm";
import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { timestampsDrizzle } from "../helpers/timestamps.helpers";
import { companiesTable } from "./companies.schema";
import { salesTable } from "./sales.schema";

export const productsTable = pgTable("products", {
	id: varchar().primaryKey(),
	companyId: varchar().notNull(),
	productName: varchar().notNull(),
	quantity: integer().notNull(),
	price: integer().notNull(),
	description: text(),
	...timestampsDrizzle,
});

export const productsRelations = relations(productsTable, ({ one, many }) => ({
	company: one(companiesTable, {
		fields: [productsTable.companyId],
		references: [companiesTable.id],
	}),
	sales: many(salesTable),
}));
