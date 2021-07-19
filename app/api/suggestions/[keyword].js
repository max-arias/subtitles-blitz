import omdb from "app/services/omdb"
import redis from "app/services/redis"

const keyword = async (req, res) => {
  console.log({ redis })
  const {
    query: { keyword },
  } = req

  try {
    const result = await redis.asyncGet(keyword)

    if (result) {
      return res.json(JSON.parse(result))
    }

    const data = await omdb.search(keyword)

    if (data?.length) {
      await redis.asyncSet(keyword, JSON.stringify(data))
    }

    res.json(data)
  } catch (error) {
    res.json(error)
  }
}

export default keyword
