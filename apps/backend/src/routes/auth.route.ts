import { Router } from 'express';
import {
  requestBodyValidation,
  errorHandleMiddleware,
} from '../middleware/errorHandler-middleware';

import {
  userSchema,
  forgetPasswordSchema,
  loginSchema,
  resendEmailVerificationSchema,
  resetPasswordSchema,
} from '@packages/schema';
import { createUserController } from '../controller/auth/create-user.controller';
import { LoginController } from '../controller/auth/login-user.controller';
import { verifyEmailController } from '../controller/auth/verify-email.controller';
import { resendEmailVerificationContoller } from '../controller/auth/resend-email-verification.controller';
import { refreshTokenController } from '../controller/auth/refresh-token.controller';
import { forgetPasswordController } from '../controller/auth/forget-password.controller';
import { resetPasswordController } from '../controller/auth/reset-password.controller';
import { logoutUserController } from '../controller/auth/logout-user.controller';

const router: Router = Router();

router.post(
  '/signup',
  requestBodyValidation(userSchema),
  errorHandleMiddleware(createUserController),
);
router.post(
  '/login',
  requestBodyValidation(loginSchema),
  errorHandleMiddleware(LoginController),
);
router.post('/verify-email', errorHandleMiddleware(verifyEmailController));
router.post(
  '/resend-email-verification',
  requestBodyValidation(resendEmailVerificationSchema),
  errorHandleMiddleware(resendEmailVerificationContoller),
);
router.post('/refresh-token', errorHandleMiddleware(refreshTokenController));
router.post(
  '/forget-password',
  requestBodyValidation(forgetPasswordSchema),
  errorHandleMiddleware(forgetPasswordController),
);
router.post(
  '/reset-password',
  requestBodyValidation(resetPasswordSchema),
  errorHandleMiddleware(resetPasswordController),
);
router.post('/logout', errorHandleMiddleware(logoutUserController));

export default router;
