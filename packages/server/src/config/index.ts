// SERVER CONFIGURATION
import * as dotenv from 'dotenv'
import * as path from 'path'
import { cleanEnv, str, url } from 'envalid'
dotenv.config({ path: path.resolve(__dirname, '../../.env.development.local') })

const config = cleanEnv(process.env, {
  PORT: str({
    default: '3000',
  }),
  ORIGIN: url(),
  NODE_ENV: str({
    choices: ['development', 'production', 'test'],
    default: 'development',
  }),
})

export default config
