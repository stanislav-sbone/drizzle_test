import { Router, Request, Response } from "express";
import { authLogin, authRegister } from "../controller/usersController";

const usersRouter = Router();

usersRouter.post('/register', authRegister);

usersRouter.post('/login', authLogin);

// usersRouter.patch('/user', (req: Request, res: Response) => {
//   res.json({ message: 'Update user', data: req.body });
// });

// usersRouter.delete('/user', (req: Request, res: Response) => {
//   res.json({ message: 'Delete user' });
// });

export default usersRouter;