import createHttpError from 'http-errors';
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from '../services/students.js';

export const getStudentsController = async (req, res, next) => {
  const students = await getAllStudents();
  res.status(200).json({ data: students });
};

export const getStudentByIdController = async (req, res, next) => {
  const { studentId } = req.params;

  const student = await getStudentById(studentId);
  if (!student) {
    throw createHttpError(404, 'Not found student');
  }
  res.json({
    status: 200,
    data: student,
    message: `student with ${studentId} id was succeessfullty found`,
  });
};

export const createStudentConrtoller = async (req, res) => {
  const payload = req.body;
  const student = await createStudent(payload);

  res.status(201).json({
    status: 201,
    message: 'Student successfully created',
    data: student,
  });
};

export const deleteStudentByIdController = async (req, res, next) => {
  const studentId = req.params;
  const student = await deleteStudent(studentId);

  if (!student) {
    next(createHttpError(404, 'Not found student'));
    return;
  }

  res.status(204).send();
};

export const upsertStudentController = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await updateStudent(studentId);
  if (!student) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  const status = student.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a student!`,
    data: student.student,
  });
};

export const patchStudentController = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await updateStudent(studentId, req.body);
  if (!student) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  const status = student.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a student!`,
    data: student.student,
  });
};
