import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../infrastructure/config';
import { userRepository } from '../user';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(401).send('Access Denied');

  try {
    const decodedData: any = jwt.verify(token, config?.jwtSecret);

    const checkpayload: any = {
      id: decodedData.id
    }
    
    const user = await userRepository.fetchOneUserWithOr(checkpayload)

    if (!user) {
      throw {
        status: {
          code: 401,
          success: false,
        },
        message: 'User not found'
      }
    }

    next();
  } catch (error) {
    return res.status(400).send('Invalid Token');
  }


}

export { verifyToken }