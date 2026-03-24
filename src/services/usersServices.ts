import bcrypt from 'bcrypt';
import { users } from '../db/schema';
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
  
    return {
      message: 'Пользователь успешно зарегистрирован',
      newUser
    };
  };