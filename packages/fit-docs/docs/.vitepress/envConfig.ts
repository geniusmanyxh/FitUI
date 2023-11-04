import {config as doteConfig} from 'dotenv'

const argvs = process.argv
const last_index = argvs.length - 1
const last_val = argvs[last_index]
let env_path = '.env'

if (argvs.includes('--env_type') ) {
  env_path += `.${last_val}`
}

const envResult = doteConfig({path:env_path})

if (envResult.error) {
  throw envResult.error
}

const envVal = envResult.parsed as ImportMetaEnv

export {envVal}