import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { getAllStudents, getStudentById } from './services/students.js';

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

  app.listen(PORT, () => {
    console.log(`We are in ${PORT} PORT now`);
  });

  app.get('/', (req, res) => {
    res.json({ message: 'it`s work' });
  });

  app.get('/students', async (req, res) => {
    const students = await getAllStudents();
    res.status(200).json({ data: students });
  });

  app.get('/students/:studentId', async (req, res, next) => {
    const { studentId } = req.params;
    const student = await getStudentById(studentId);

    res.status(200).json({ data: student });
  });

  app.get((req, res, next) => {
    res.status(404).json({ message: 'Page not found' });
  });

  app.use((req, res, err) => {
    res
      .status(500)
      .json({ message: 'Server are sleeping :)', err: err.message });
  });
};
