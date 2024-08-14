import { Router } from 'express';
import {
  requestBodyValidation,
  errorHandleMiddleware,
} from '../middleware/errorHandler-middleware';
import { getProfileController } from '../controller/user/get-profile.controller';
import { authMiddlware, roleMiddleware } from '../middleware/auth-middleware';
import { deleteProfileController } from '../controller/user/delete-profile.controller';
import { getAllUserController } from '../controller/user/get-all-user.controller';
// import { ROLE } from '@prisma/client';
import { deleteUserController } from '../controller/user/delete-user.controller';
import { updateProfileController } from '../controller/user/update-profile.conteroller';
import { updateUserController } from '../controller/user/update-user.controller';
import { getAlluserSchema, updateUserSchema } from '@packages/schema';

const router: Router = Router();

router.get(
  '/get-profile',
  authMiddlware,
  errorHandleMiddleware(getProfileController),
);
router.patch(
  '/update-profile',
  authMiddlware,
  requestBodyValidation(updateUserSchema),
  errorHandleMiddleware(updateProfileController),
);
router.delete(
  '/delete-profile',
  authMiddlware,
  errorHandleMiddleware(deleteProfileController),
);

// The following actions require special permissions:

router.get(
  '/get-users',
  authMiddlware,
  roleMiddleware(['ADMIN']),
  requestBodyValidation(getAlluserSchema),
  errorHandleMiddleware(getAllUserController),
);
router.delete(
  '/delete-user/:userId',
  authMiddlware,
  roleMiddleware(['ADMIN']),
  errorHandleMiddleware(deleteUserController),
);

router.patch(
  '/update-user:userId',
  authMiddlware,
  roleMiddleware(['ADMIN']),
  requestBodyValidation(updateUserSchema),
  errorHandleMiddleware(updateUserController),
);

export default router;
