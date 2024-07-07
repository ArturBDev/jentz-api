import { config } from 'dotenv'
import { EnvironmentSecrets } from './types'

const envConfig = config().parsed

if (!envConfig) {
  console.warn('No .env file found')
}

const rawProcessEnv = {
  ...process.env,
  ...envConfig
}

const parsedProcessEnv = EnvironmentSecrets.safeParse({
  ...rawProcessEnv
})

if (!parsedProcessEnv.success) {
  throw new Error(parsedProcessEnv.error.message)
}

export const effectiveProcessEnv = parsedProcessEnv.data
