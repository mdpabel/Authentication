import { tokenRotation } from '../../utils/token-rotation';

export const refreshTokenService = async (oldRefreshToken: string) => {
  const { newAccessToken, newRefreshToken } = await tokenRotation(
    oldRefreshToken,
  );

  return { newAccessToken, newRefreshToken };
};
