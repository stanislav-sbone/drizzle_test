import { Request, Response } from "express";
import { registerUser } from "../services/usersServices";

export const authRegister = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body

      const result = await registerUser(email, password);
  
      return res.status(200).json(result);
    } catch (error) {
      console.error('Get user data error', error);
  
      return res.status(404).json({
        message:
          error instanceof Error
            ? error.message
            : 'Ошибка получения пользователя',
      });
    }
  };