import express from 'express'
const router = express.Router();
import { prisma } from '../infrastructure/prisma';
import bcrypt from 'bcryptjs'

import { userRepository } from '../user/index'


router.post('/register', async (req, res) => {
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

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await userRepository.getUserByEmail(email);

  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }

  const validPassword = await bcrypt.compareSync(password, user.password);

  if (!validPassword) {
    return res.status(401).send({ message: 'Invalid password' });
  }

  res.send(user);
})

export { router as authRouter }