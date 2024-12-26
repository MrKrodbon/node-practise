import { Router } from 'express';
import {
  loginUserController,
  registerUserController,
} from '../controllers/students';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import { validateBody } from '../middleware/validateBody';
import { loginUserSchema, registerUserSchema } from '../validation/auth';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

export default router;
