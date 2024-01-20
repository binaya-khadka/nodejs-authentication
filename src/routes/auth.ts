import express, { Request, Response } from 'express'
const router = express.Router();
import bcrypt from 'bcryptjs'
import { jwtUtils } from '../utils';
import { userRepository } from '../user/index'
import { verifyToken } from '../middleware/authMiddleware';

router.post('/register', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const payload = { name, email, password: hashPassword }

  try {
    const user = await userRepository.createUser(payload);
    res.send({ status: 200, data: user, message: 'Successfully stored User Information' });
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Something went wrong' });
  }

})

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userRepository.getUserByEmail(email);

  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }


  const validPassword = await bcrypt.compareSync(password, user.password);

  if (!validPassword) {
    return res.status(401).send({ message: 'Invalid password' });
  }

  const token = jwtUtils.createJwtToken(user.id);

  res.status(200).json({ token: token, user: user });
})

//  check token
router.get('/validate-token', verifyToken, (req: Request, res: Response) => {
  res.json({ isValid: true, success: true, message: 'Token is valid' });
})

export { router as authRouter }