import express from 'express';
import 'dotenv/config';
import usersRouter from './routes/authRoutes';
import productsRouter from './routes/productsRoutes';
import userRouter from './routes/userRoutes';

const app = express();

app.use(express.json());

app.use('/api/auth', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/user', userRouter);

export default app;