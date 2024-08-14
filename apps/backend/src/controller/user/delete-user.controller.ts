import { Response } from 'express';
import { RequestWithUser } from '../../types/auth-types';
import { ErrorResponse } from '../../utils/custom-error';
import { deleteUserService } from '../../services/user/delete-user.service';

export const deleteUserController = async (
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

  await deleteUserService(+userId);

  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
  });
};
