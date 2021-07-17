import React, { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { minutesToHours } from "../../../utils/dates"

import IndeterminateLoader from "../../../components/Loader/Indeterminate"

const Subs = ({ mediaData, imdbId }) => {
  const [loading, setLoading] = useState(false)
  const [episodes, setEpisodes] = useState([])
  const [season, setSeason] = useState(null)

  const episodeRef = useRef(null)

  const fetchEpisodes = async (tvId, seasonNum) => {
    const url = new URL(`${location.origin}/api/tv`)
    url.search = new URLSearchParams({
      tvId,
      seasonNum,
      imdbId,
    }).toString()

    setLoading(true)

    const data = await fetch(url).then((res) => res.json())

    setEpisodes(data)
    setLoading(false)
    setSeason(seasonNum)

    episodeRef.current.scrollIntoView({
      behavior: "smooth",
    })
  }

  return (
    <div className="w-full h-screen font-sans">
      <div className="grid grid-cols-1 px-4 md:px-20 lg:px-40">
        <div className="grid grid-flow-row md:grid-flow-col auto-rols-max shadow-lg p-4 bg-white rounded mb-3 md:mb-8">
          <Image
            width="185"
            height="278"
            className="rounded"
            src={`http://image.tmdb.org/t/p/w185/${mediaData.data.poster_path}`}
            alt={mediaData.title}
          />
          <div className="lg:pl-8">
            <h1 className="font-bold text-4xl mb-2">{mediaData.title}</h1>
            <p>{mediaData.data.genres.map((g) => g.name).join(" | ")}</p>
            <p>{minutesToHours(mediaData.data.runtime)}</p>
            <p className="mt-2 pr-6">{mediaData.data.overview}</p>
          </div>
        </div>

        <div className="grid grid-flow-row auto-rols-max shadow-lg p-4 bg-white rounded mb-3 md:mb-8">
          <h2 className="text-2xl font-bold mb-5">Seasons</h2>

          {mediaData?.data?.seasons.map((s, index) => {
            const poster =
              s.poster_path === "N/A"
                ? "https://via.placeholder.com/94x128?text=No+Image"
                : s.poster_path

            return (
              <div
                className="w-full flex mb-4 cursor-pointer lg:h-32 last:mb-0"
                onClick={() => fetchEpisodes(mediaData.data.id, s.season_number)}
                key={s.id}
              >
                <div style={{ position: "relative", width: 92, height: 138 }} className="w-1/3">
                  <Image
                    layout="fill"
                    objectFit="contain"
                    className="h-auto w-auto flex-none bg-cover rounded-tl rounded-bl text-center overflow-hidden"
                    src={`https://image.tmdb.org/t/p/w92/${poster}`}
                    alt={s.name}
                  />
                </div>

                <div
                  style={{ maxHeight: 138 }}
                  className="md:w-full w-2/3 border-r border-b border-gray-400 border-t bg-white rounded rounded-tl-none rounded-bl-none p-2 flex flex-col flex-grow"
                >
                  <div className="text-gray-900 font-bold text-xl mb-1">
                    Season {s.season_number} - {s.name}
                  </div>
                  <p className="text-gray-700 overflow-clip overflow-hidden">{s.overview}</p>
                </div>
              </div>
            )
          })}
        </div>
        {loading ? (
          <div className="mt-8">
            <IndeterminateLoader />
          </div>
        ) : null}

        {!loading && season !== undefined && !episodes.length ? (
          <div
            className="grid grid-flow-row auto-rols-max shadow-lg p-4 bg-white rounded mb-8"
            ref={episodeRef}
          >
            <h2 className="text-2xl font-bold py-4">No Episodes data found</h2>
          </div>
        ) : null}

        {episodes.length ? (
          <div
            className="grid grid-flow-row auto-rols-max shadow-lg p-4 bg-white rounded"
            ref={episodeRef}
          >
            <h2 className="text-2xl font-bold mb-8">Episodes</h2>

            {episodes.map((episode, index) => {
              // TODO: Make util
              // TODO: Make rendering these rows into a component
              const poster =
                episode.data.still_path === "N/A"
                  ? "https://via.placeholder.com/94x128?text=No+Image"
                  : episode.data.still_path

              return (
                <Link href={`/subs/${episode.imdbId}`} key={episode.id}>
                  <div className="w-full flex mb-4 cursor-pointer lg:h-32 last:mb-0 border border-gray-400 rounded">
                    <div style={{ position: "relative", width: 92, height: 138 }} className="w-1/3">
                      <Image
                        layout="fill"
                        objectFit="contain"
                        className="w-auto h-auto flex-none bg-cover rounded-tl rounded-bl text-center overflow-hidden"
                        src={`https://image.tmdb.org/t/p/w185/${poster}`}
                        alt={episode.title}
                      />
                    </div>

                    <div
                      style={{ maxHeight: 138 }}
                      className="md:w-full w-2/3 bg-white p-2 flex flex-col  flex-grow"
                    >
                      <div className="text-gray-900 font-bold text-xl mb-1">
                        S{episode.seasonNum}E{episode.episodeNum} - {episode.title}
                      </div>
                      <p className="text-gray-700 overflow-clip overflow-hidden">
                        {episode.data.overview}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const { imdbId } = ctx.params

  const API_URL = process.env.API_URL || "/"

  const data = await fetch(`${API_URL}/media-items?imdbId=${imdbId}`)
  const mediaData = await data.json().then((res) => (res ? res[0] : null))

  return {
    props: {
      mediaData,
      imdbId,
    },
  }
}

export default Subs
