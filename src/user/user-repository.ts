import { prisma } from "../infrastructure/prisma";
import { User } from '@prisma/client'

const createUser = async (
  payload: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'avatarUrl'>
) => {
  return await prisma.user.create({
    data: payload
  })
}

const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    }
  })
}

export { createUser, getUserByEmail }