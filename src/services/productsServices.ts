import { eq } from 'drizzle-orm';
import { db } from '../db/connection';
import { products } from '../db/schema';

export const getAllProducts = async () => {
  return await db.select().from(products);
};

export const getProduct = async (id: number) => {
  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, id))

  return product[0] ?? null;
};