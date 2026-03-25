import express from 'express';
import 'dotenv/config';
import usersRouter from './routes/authRoutes';
import productsRouter from './routes/productsRoutes';

const app = express();

app.use(express.json());

app.use('/api', usersRouter);
app.use('/api/products', productsRouter);

export default app;