import { Response } from 'express';
import { RequestWithUser } from '../../types/auth-types';
import { updateUserService } from '../../services/user/update-user.service';

export const updateUserController = async (
  req: RequestWithUser,
  res: Response,
) => {
  const userId = req.params.userId;

  if (!userId) {
    res.status(400).json({
      success: false,
      message: 'User ID is required',
    });
    return;
  }

  const updatedUser = await updateUserService(req.body, +userId);

  res.status(200).json({
    success: true,
    message: 'User updated successfully',
    data: updatedUser,
  });
};
