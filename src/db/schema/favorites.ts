import { uuid, integer, pgTable } from "drizzle-orm/pg-core";
import { users } from "./users";

export const usersFavorites = pgTable('users_favorites', {
    user_id: uuid().primaryKey().references(() => users.id, { onDelete: 'cascade' }),
    items: integer().array().notNull().default([])
})