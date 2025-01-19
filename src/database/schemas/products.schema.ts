import { relations } from "drizzle-orm";
import { bigint, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { timestampsDrizzle } from "../helpers/timestamps.helpers";
import { companiesTable } from "./companies.schema";

export const productsTable = pgTable("products", {
	id: varchar().primaryKey(),
	companyId: varchar().notNull(),
	productName: varchar().notNull(),
	quantity: integer().notNull(),
	price: bigint("price", {
		mode: "bigint",
	}).notNull(),
	description: text(),
	...timestampsDrizzle,
});

export const productsRelations = relations(productsTable, ({ one }) => ({
	company: one(companiesTable, {
		fields: [productsTable.companyId],
		references: [companiesTable.id],
	}),
}));
