"use strict"

const fetch = require("node-fetch")

// TODO: Move to env var
const BASE_OMDB_URL = "http://www.omdbapi.com"
const OMDB_API_KEY = process.env.OMDBAPI_KEY

const search = async (term) => {
  const url = `${BASE_OMDB_URL}/?s=${encodeURIComponent(term)}&apikey=${OMDB_API_KEY}`

  try {
    const result = await fetch(url).then((r) => r.json())

    if (result.Response === "True") {
      let data = result.Search.filter((item) => item.Type === "series" || item.Type === "movie")

      if (data.length) {
        const extraDataPromises = data.map((item) => {
          return fetch(`${BASE_OMDB_URL}/?i=${item.imdbID}&apikey=${OMDB_API_KEY}`).then((r) =>
            r.json()
          )
        })

        data = await Promise.all(extraDataPromises)
      }

      return data
    } else {
      return []
    }
  } catch (error) {
    console.log("omdb error", error)
    return []
  }
}

module.exports = {
  search,
}
