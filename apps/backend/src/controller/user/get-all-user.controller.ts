import { Response } from 'express';
import { RequestWithUser } from '../../types/auth-types';
import { GetAllUser } from '@packages/schema';
import { getAllUserService } from '../../services/user/get-all-user.service';

export const getAllUserController = async (
  req: RequestWithUser,
  res: Response,
) => {
  const { limit, page } = req.query as GetAllUser;

  const users = await getAllUserService({
    limit,
    page,
  });

  res.status(200).json({
    success: true,
    data: users,
  });
};
