import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import studentsRouter from './routers/students.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const PORT = Number(process.env.PORT);
export const startServer = () => {
  const app = express();

  app.use(express.json());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({ message: 'it`s work' });
  });

  app.use(studentsRouter);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`We are in ${PORT} PORT now`);
  });
};
