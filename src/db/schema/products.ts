import { sql } from 'drizzle-orm';
import {
  boolean,
  integer,
  varchar,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  text,
} from 'drizzle-orm/pg-core';

export const productCategoryEnum = pgEnum('product_category', [
  'Смартфоны',
  'Ноутбуки',
  'Комплектующие для ПК',
  'Бытовые приборы',
  'Смарт-часы',
]);

export const products = pgTable('products', {
    id: integer().primaryKey().notNull(),
    title: varchar({length: 50}).notNull(),
    brand: varchar({length: 20}).notNull(),
    description: text().notNull(),
    price: integer().notNull(),
    category: productCategoryEnum('category').notNull(),
    images: text('images')
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),    
    rating: numeric('rating', {
        precision: 2,
        scale: 1,
        mode: 'number',
      }).notNull(),
    in_stock: boolean().notNull(),
    is_new: boolean().notNull(),
    discount: numeric('discount', {
        precision: 3,
        scale: 2,
        mode: 'number',
      }),
    specs: jsonb('specs').$type<Record<string, string>>(),
})