import { Request, Response, NextFunction } from 'express';
import jwtUtil from '../utils/jwtUtil';

async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const data = authorization.split(' ');
    const decoded = jwtUtil.verify(data[1]);

    if (data[0] !== 'Bearer' || !decoded.id) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }  
}

export default authMiddleware;
