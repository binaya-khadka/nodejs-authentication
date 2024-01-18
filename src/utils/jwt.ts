import { config } from "../infrastructure/config";
import jwt from 'jsonwebtoken'

const createJwtToken = (id: string) => {
  const expireOn =
     Math.floor(Date.now() / 1000) + 60 * 60 * config?.tokenValidationDays
  return jwt.sign(
     {
        exp: expireOn,
        id,
     },
     config?.jwtSecret!,
  )
}

export { createJwtToken }
