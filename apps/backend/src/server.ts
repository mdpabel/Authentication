import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route';
import userRoutes from './routes/user.route';
import {
  catchErrorMiddleware,
  notFoundErrorMiddleware,
} from './middleware/errorHandler-middleware';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.use(notFoundErrorMiddleware);
app.use(catchErrorMiddleware);

export default app;
