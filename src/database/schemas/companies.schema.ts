import { relations } from "drizzle-orm";
import { boolean, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { timestampsDrizzle } from "../helpers/timestamps.helpers";
import { usersTable } from "./users.schema";

export const companiesTable = pgTable("companies", {
	id: varchar().primaryKey(),
	userId: varchar().notNull(),
	companyName: varchar().notNull(),
	companyEmail: varchar().notNull(),
	contactPhone: varchar().notNull(),
	address: varchar().notNull(),
	description: text(),
	status: boolean().default(false),
	...timestampsDrizzle,
});

export const companiesRelations = relations(companiesTable, ({ one }) => ({
	user: one(usersTable, {
		fields: [companiesTable.userId],
		references: [usersTable.id],
	}),
}));

/* 
	https://orm.drizzle.team/docs/relations
	id: varchar().primaryKey(),
	companyName: st
	userId: string que irá conter o uuid a quem a empresa pertence
	productsIDs: array de strings que conterão os produtos 

*/
