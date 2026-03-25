import { Router } from 'express';
import { getCart, getFavorites, getUserData, setCart, setFavorites, updateUser } from '../controller/userController';

const userRouter = Router();

userRouter.get('/me', getUserData);
userRouter.patch('/me', updateUser);

userRouter.get('/me/favorites', getFavorites);
userRouter.put('/me/favorites', setFavorites);

userRouter.get('/me/cart', getCart);
userRouter.put('/me/cart', setCart);

export default userRouter;