import { Response } from 'express';
import { RequestWithUser } from '../../types/auth-types';
import { updateUserService } from '../../services/user/update-user.service';

export const updateProfileController = async (
  req: RequestWithUser,
  res: Response,
) => {
  if (!req.user || !req.user.id) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
    return;
  }

  const updatedUser = await updateUserService(req.body, req.user.id);

  res.status(200).json({
    success: true,
    message: 'User updated successfully',
    data: updatedUser,
  });
};
