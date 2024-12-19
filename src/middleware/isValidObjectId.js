import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { studentId } = res.params;
  if (!isValidObjectId(studentId)) throw createHttpError(400, 'Bad request');
  next();
};
