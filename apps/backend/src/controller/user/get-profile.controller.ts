import { Response } from 'express';
import { RequestWithUser } from '../../types/auth-types';
import { ErrorResponse } from '../../utils/custom-error';
import { getProfileService } from '../../services/user/get-profile.service';

export const getProfileController = async (
  req: RequestWithUser,
  res: Response,
) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new ErrorResponse('', 500);
  }

  const user = await getProfileService(userId);

  res.status(200).json({
    success: true,
    data: user,
  });
};
