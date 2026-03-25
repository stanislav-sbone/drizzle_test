import { jsonb, pgTable, uuid } from 'drizzle-orm/pg-core';
import { users } from './users';

export type CartItem = {
  productId: number;
  quantity: number;
};

export const usersCart = pgTable('users_cart', {
  user_id: uuid('user_id')
    .primaryKey()
    .references(() => users.id, { onDelete: 'cascade' }),

  items: jsonb('items')
    .$type<CartItem[]>()
    .notNull()
    .default([]),
});