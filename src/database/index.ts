import { drizzle } from "drizzle-orm/postgres-js";
import postgres from 'postgres';
// import { users } from "./schemas/users.schema";

const queryClient = postgres(process.env.DATABASE_URL);
export const db = drizzle({ client: queryClient });

/* 
const result = await db.execute('select 1');

const usersCount = await db.$count(users);
console.log(usersCount);
*/
