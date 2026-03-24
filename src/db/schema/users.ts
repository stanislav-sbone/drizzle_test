import { varchar, boolean, text, uuid, pgTable } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: uuid().primaryKey().defaultRandom(),
    email: varchar({length: 255}).notNull().unique(),
    password_hash: text().notNull(),
    first_name: varchar({length: 30}),
    last_name: varchar({length: 30}),
    phone: varchar({length: 20}),
    address: text(),
    is_profile_completed: boolean().notNull().default(false)
})