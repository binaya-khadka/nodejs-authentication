import express from 'express'
const router = express.Router();
import { prisma } from '../infrastructure/prisma';

import { userRepository } from '../user/index'


router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const payload = { name, email, password }

  try {
    const user = await userRepository.createUser(payload);
    res.send({ status: 200, data: user, message: 'Successfully stored User Information' });
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Something went wrong' });
  }

})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await userRepository.getUserByEmail(email);

  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }
  if (user.password !== password) {
    return res.status(401).send({ message: 'Invalid password' });
  }
  res.send(user);
})

export { router as authRouter}