import redis from "redis"
import { promisify } from "util"
import omdb from "../../services/omdb"

const keyword = async (req, res) => {
  const {
    query: { keyword },
  } = req

  try {
    // TODO: Move this
    const client = redis.createClient()
    const asyncGet = promisify(client.get).bind(client)
    const asyncSet = promisify(client.set).bind(client)

    const result = await asyncGet(keyword)

    if (result) {
      return res.json(JSON.parse(result))
    }

    const data = await omdb.search(keyword)

    if (data?.length) {
      await asyncSet(keyword, JSON.stringify(data))
    }

    res.json(data)
  } catch (error) {
    res.json(error)
  }
}

export default keyword
