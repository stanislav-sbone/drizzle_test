import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/usersServices";

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

  export const authLogin = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({
          message: 'Необходим email и пароль',
        });
      }
  
      const result = await loginUser(email, password);
  
      return res.status(200).json(result);
    } catch (error) {
      console.error('Login error', error);
  
      return res.status(401).json({
        message: error instanceof Error ? error.message : 'Ошибка входа',
      });
    }
  };