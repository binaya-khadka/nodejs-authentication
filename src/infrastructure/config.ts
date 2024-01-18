import {config as _config} from 'dotenv'

_config()

const loadFromEnv = (key: string): string => {
  if (typeof process.env[key] !== 'undefined') {
    return process.env[key] as string
  }
  throw new Error(`Environment variable ${key} is not defined`)
}

export const config = {
  PORT: loadFromEnv('PORT') || 8000,
  jwtSecret: loadFromEnv('JWT_SECRET') || 'thisissecret',
  tokenValidationDays: parseInt(loadFromEnv('TOKEN_VALID_DAY')!) || 200,
}