import { StudentsCollection } from '../db/models/student.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllStudents = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const studentQuery = StudentsCollection.find();
  const studentsCount = await StudentsCollection.find()
    .merge(studentQuery)
    .countDocuments();

  const students = await studentQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(studentsCount, page, perPage);

  return {
    data: students,
    ...paginationData,
  };
};

export const getStudentById = async (id) => {
  const students = await StudentsCollection.findById(id);
  return students;
};

export const createStudent = async (payload) => {
  const student = await StudentsCollection.create(payload);
  return student;
};

export const deleteStudent = async (studentId) => {
  const student = await StudentsCollection.findOneAndDelete({ _id: studentId });
  return student;
};

export const updateStudent = async (studentId, payload, options = {}) => {
  const rawResult = await StudentsCollection.findOneAndUpdate(
    { _id: studentId },
    payload,
    { new: true, includeResultMetadata: true, ...options },
  );

  if (!rawResult || !rawResult.value) {
    return null;
  }
  return {
    student: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
