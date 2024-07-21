import { RequestHandler } from 'express';

import { JwtFacade } from '@/shared/facades';
import { UserModel } from '@/users/models';

export class AuthMiddleware {
  static validateJWT: RequestHandler = async (req, res, next) => {
    const bearerToken = req.header('Authorization');
    if (!bearerToken || !bearerToken.startsWith('Bearer'))
      return res.status(401).json({ messages: ['Unauthorized'] });

    const jwt = bearerToken.split(' ')[1];

    try {
      const payload = await JwtFacade.validateToken<{ id: string }>(jwt);
      if (!payload) return res.status(401).json({ error: 'Invalid token' });

      const user = await UserModel.findById(payload.id).lean();
      if (!user) return res.status(401).json({ error: 'Invalid token' });

      // isActive?
      (req as any).user = {
        id: user._id.toString(),
        username: user.username,
      };

      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}
