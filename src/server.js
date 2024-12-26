import express from 'express';
import pino from 'pino-http';
import dotenv from 'dotenv';
import routers from './routers/routers.js';
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

  app.use(routers);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`We are in ${PORT} PORT now`);
  });
};
