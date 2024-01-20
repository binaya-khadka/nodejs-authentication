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
          isValid: false,
        },
        message: 'User not found'
      }
    }

    next();
  } catch (error) {
    throw {
      status: {
        code: 501,
        success: false,
        isValid: false,
      }
    }
    // return res.status(401).send({message: 'Something went wrong'});
  }


}

export { verifyToken }