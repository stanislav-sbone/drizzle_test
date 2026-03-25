import bcrypt from 'bcrypt';
import { usersFavorites, users, usersCart } from '../db/schema';
import { eq } from 'drizzle-orm';
import { db } from '../db/connection';

export const registerUser = async (email: string, password: string) => {
    const userData = await db.select().from(users).where(eq(users.email, email))

    if (userData.length) {
      throw new Error('Аккаунт с таким email уже существует');
    }
  
    const saltRounds = Number(process.env.SALT_ROUNDS);
  
    if (!Number.isInteger(saltRounds) || saltRounds <= 0) {
      throw new Error('SALT_ROUNDS должен быть положительным числом');
    }
  
    const hashedPassword = await bcrypt.hash(password, saltRounds);
  
    const [newUser] = await db.insert(users).values({email: email, password_hash: hashedPassword}).returning();

    await db.insert(usersFavorites).values({user_id: newUser.id})
    await db.insert(usersCart).values({user_id: newUser.id})
  
    return {
      message: 'Пользователь успешно зарегистрирован',
      // token,
      user: {
        id: newUser.id,
        email: newUser.email,
        isProfileCompleted: newUser.is_profile_completed,
      }
    };
  };

  export const loginUser = async (email: string, password: string) => {
    const userData = await db.select({
      id: users.id,
      email: users.email,
      password_hash: users.password_hash,
    }).from(users).where(eq(users.email, email));
  
    if (userData.length === 0) {
      throw new Error('Неверный email или пароль');
    }

    const user = userData[0]
    const isCorrectPassword = await bcrypt.compare(password, user.password_hash);
  
    if (!isCorrectPassword) {
      throw new Error('Неверный email или пароль');
    }
  
    return {
      message: 'Успешная авторизация',
      // token,
      user: {
        userId: user.id,
        email: user.email,
      },
    };
  };