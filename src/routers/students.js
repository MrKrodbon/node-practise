import { Router } from 'express';
import {
  createStudentConrtoller,
  deleteStudentByIdController,
  getStudentByIdController,
  getStudentsController,
  patchStudentController,
  upsertStudentController,
} from '../controllers/students.js';
import { validateBody } from '../middleware/validateBody.js';
import {
  createStudentSchema,
  updateStudentSchema,
} from '../validation/students.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/students', ctrlWrapper(getStudentsController));

router.get('/students/:studentId', ctrlWrapper(getStudentByIdController));

router.post(
  '/students',
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentConrtoller),
);

router.delete('/students/:studentId', ctrlWrapper(deleteStudentByIdController));

router.put('/students/:studentId', ctrlWrapper(upsertStudentController));

router.patch(
  '/students/:studentId',
  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudentController),
);

export default router;
