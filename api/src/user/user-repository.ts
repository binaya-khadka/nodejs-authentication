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

const fetchOneUserWithOr = async (payload: Partial<User>) => {
  return await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: {
            endsWith: payload.email,
            startsWith: payload.email,
            mode: 'insensitive'
          }
        },
        {
          id: payload.id
        }
      ]
    }
  })
}


export { createUser, getUserByEmail, fetchOneUserWithOr}