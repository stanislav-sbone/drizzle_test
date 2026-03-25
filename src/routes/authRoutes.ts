import { Router, Request, Response } from "express";
import { authLogin, authRegister } from "../controller/authController";

const usersRouter = Router();

usersRouter.post('/register', authRegister);
usersRouter.post('/login', authLogin);

export default usersRouter;