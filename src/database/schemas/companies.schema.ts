import { relations } from "drizzle-orm";
import { boolean, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { timestampsDrizzle } from "../helpers/timestamps.helpers";
import { productsTable } from "./products.schema";
import { salesTable } from "./sales.schema";
import { usersTable } from "./users.schema";

export const companiesTable = pgTable("companies", {
	id: varchar().primaryKey(),
	userId: varchar().notNull(),
	companyName: varchar().notNull(),
	companyEmail: varchar().notNull().unique(),
	contactPhone: varchar().notNull().unique(),
	address: varchar().notNull(),
	description: text(),
	status: boolean().default(false),
	...timestampsDrizzle,
});

export const companiesRelations = relations(companiesTable, ({ one, many }) => ({
	user: one(usersTable, {
		fields: [companiesTable.userId],
		references: [usersTable.id],
	}),
	products: many(productsTable),
	sales: many(salesTable),
}));
