import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { companiesTable } from "./companies.schema";
import { productsTable } from "./products.schema";
import { usersTable } from "./users.schema";

export const salesTable = pgTable("sales", {
	id: varchar().primaryKey(),
	companyId: varchar().notNull(),
	productId: varchar().notNull(),
	costumerId: varchar().notNull(),
	saleDate: timestamp().defaultNow().notNull(),
	unitPrice: integer().notNull(),
	totalPrice: integer().notNull(),
	paymentMethod: varchar().notNull(),
	saleStatus: boolean().default(false),
});

export const salesRelation = relations(salesTable, ({ one }) => ({
	company: one(companiesTable, {
		fields: [salesTable.companyId],
		references: [companiesTable.id],
	}),
	product: one(productsTable, {
		fields: [salesTable.productId],
		references: [productsTable.id],
	}),
	user: one(usersTable, {
		fields: [salesTable.costumerId],
		references: [usersTable.id],
	}),
}));
