"use strict"

const fetch = require("node-fetch")

const BASE_MOVIE_DB_URL = "https://api.themoviedb.org/3"
const MOVIE_DB_API_KEY = process.env.MOVIE_DB_KEY

const search = async (term) => {
  const url = `${BASE_MOVIE_DB_URL}/search/multi?query=${term}&api_key=${MOVIE_DB_API_KEY}&include_adult=false`
  const res = await fetch(url)
  const result = await res.json()

  return { result }
}

const findByIMDB = async (imdbid) => {
  const url = `${BASE_MOVIE_DB_URL}/find/${imdbid}?language=en-US&external_source=imdb_id&api_key=${MOVIE_DB_API_KEY}`
  const result = await fetch(url).then((res) => res.json())

  return result
}

const getDetailsById = async (id, type = "movie", language = "en-US") => {
  const url = `${BASE_MOVIE_DB_URL}/${type}/${id}?language=${language}&api_key=${MOVIE_DB_API_KEY}&append_to_response=external_ids`
  const result = await fetch(url).then((res) => res.json())

  return result
}

const getSeasonEpisodes = async (id, seasonNum, language = "en-US") => {
  const url = `${BASE_MOVIE_DB_URL}/tv/${id}/season/${seasonNum}?language=${language}&api_key=${MOVIE_DB_API_KEY}&append_to_response=external_ids,watch/providers`

  const result = await fetch(url).then((res) => res.json())

  return result
}

const getTvEpisodeExternalIds = async (tvId, seasonNum, episodeNum) => {
  const url = `${BASE_MOVIE_DB_URL}/tv/${tvId}/season/${seasonNum}/episode/${episodeNum}?api_key=${MOVIE_DB_API_KEY}&append_to_response=external_ids,watch/providers`
  const result = await fetch(url).then((res) => res.json())

  return result
}

module.exports = {
  search,
  findByIMDB,
  getDetailsById,
  getSeasonEpisodes,
  getTvEpisodeExternalIds,
}
