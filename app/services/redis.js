import redis from "redis"
import { promisify } from "util"

const client = redis.createClient()
const asyncGet = promisify(client.get).bind(client)
const asyncSet = promisify(client.set).bind(client)

const methods = {
  asyncGet,
  asyncSet,
}

export default methods
