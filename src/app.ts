import express from 'express';
import 'dotenv/config';
import usersRouter from './routes/usersRoutes';

const app = express();

app.use(express.json());

app.use('/api', usersRouter);

export default app;