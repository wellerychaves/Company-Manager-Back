import { relations, sql } from "drizzle-orm";
import { boolean, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { timestampsDrizzle } from "../helpers/timestamps.helpers";
import { companiesTable } from "./companies.schema";

export const usersTable = pgTable("users", {
	id: varchar().primaryKey(),
	firstName: varchar().notNull(),
	secondName: varchar().notNull(),
	email: varchar().notNull().unique(),
	password: varchar().notNull(),
	isAdmin: boolean().default(false),
	companies: text().array().default(sql`ARRAY[]::text[]`),
	...timestampsDrizzle,
});

export const usersRelations = relations(usersTable, ({ many }) => ({
	companies: many(companiesTable),
}));
