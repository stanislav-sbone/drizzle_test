import { eq } from "drizzle-orm";
import { db } from "../db/connection";
import { CartItem, users, usersCart, usersFavorites } from "../db/schema";

interface updateCurrentUserParams {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}

export const getCurrentUser = async (userId: string) => {
    const userData = await db.select().from(users).where(eq(users.id, userId));

  if (userData.length === 0) {
    throw new Error('Пользователь не найден');
  }

  return {
    user: userData[0]
  }
};

export const updateCurrentUser = async ({
  userId,
  email,
  firstName,
  lastName,
  phone,
  address,
}: updateCurrentUserParams) => {
    const userData = await db
    .select({
      id: users.id,
      email: users.email,
    })
    .from(users)
    .where(eq(users.id, userId));

  if (userData.length === 0) {
    throw new Error('Пользователь не найден');
  }

  const existingUser = await db
    .select({
      id: users.id,
    })
    .from(users)
    .where(eq(users.email, email));

  if (existingUser.length > 0 && existingUser[0].id !== userId) {
    throw new Error('Аккаунт с таким email уже существует');
  }

  const updatedUser = await db
    .update(users)
    .set({
        email: email,
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        address: address
    })
    .where(eq(users.id, userId))
    .returning({
        id: users.id,
        email: users.email,
        firstName: users.first_name,
        lastName: users.last_name,
        phone: users.phone,
        address: users.address,
        isProfileCompleted: users.is_profile_completed,
    });

  return {
    message: 'Данные обновлены',
    user: updatedUser[0]
  }
};

export const getFavoritesByUserId = async (userId: string) => {
  const favorites = await db.select().from(usersFavorites).where(eq(usersFavorites.user_id, userId));

  if (favorites.length === 0) {
    return { items: [] };
  }

  return {
    items: favorites[0].items ?? []
  }
};

export const setFavoritesByUserId = async (userId: string, items: number[]) => {
    const updatedFavorites = await db.update(usersFavorites).set({items: items}).where(eq(usersFavorites.user_id, userId)).returning({items: usersFavorites.items})

  return {
    items: updatedFavorites[0].items ?? [],
  };
};

export const getCartByUserId = async (userId: string) => {
  const cart = await db.select().from(usersCart).where(eq(usersCart.user_id, userId));

  if (cart.length === 0) {
    return { items: [] };
  }

  return {
    items: cart[0].items ?? []
  }
};

export const setCartByUserId = async (userId: string, items: CartItem[]) => {
  const updatedCart = await db.update(usersCart).set({items: items}).where(eq(usersCart.user_id, userId)).returning({items: usersCart.items})
  
  return {
    items: updatedCart[0].items ?? [],
  };
};