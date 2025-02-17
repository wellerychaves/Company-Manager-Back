import { relations } from "drizzle-orm";
import { boolean, pgTable, varchar } from "drizzle-orm/pg-core";
import { timestampsDrizzle } from "../helpers/timestamps.helpers";
import { companiesTable } from "./companies.schema";
import { salesTable } from "./sales.schema";

export const usersTable = pgTable("users", {
	id: varchar().primaryKey(),
	firstName: varchar().notNull(),
	secondName: varchar().notNull(),
	email: varchar().notNull().unique(),
	password: varchar().notNull(),
	isAdmin: boolean().default(false),
	...timestampsDrizzle,
});

export const usersRelations = relations(usersTable, ({ many }) => ({
	companies: many(companiesTable),
	sales: many(salesTable),
}));
