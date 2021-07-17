import React from "react"
import { useRouter } from "next/router"

import SubsPage from "../../components/SubsPage"
import { PROVIDERS } from "../../utils/constants"

const Subs = ({ mediaData, subtitles }) => {
  const router = useRouter()
  const loading = router.isFallback

  return <SubsPage mediaData={mediaData} subtitles={subtitles} loading={loading} />
}

export async function getStaticPaths() {
  const API_URL = process.env.API_URL || "/"

  const data = await fetch(`${API_URL}/media-items`)
  const mediaItems = await data.json()

  // Get the paths we want to pre-render based on suggestions
  let paths = mediaItems.map((mediaItem) => ({
    params: { imdbId: mediaItem.imdbId },
  }))

  paths = paths.filter((item) => item.params.imdbId)

  console.log(JSON.stringify(paths))

  return { paths, fallback: true }
}

export async function getStaticProps(ctx) {
  const { imdbId } = ctx.params
  console.log(imdbId)
  let mediaData = null

  // Fetch media data (images, description, etc) based on the imdbId
  const API_URL = process.env.API_URL || "/"

  // Fetch media data for this page (poster, text, etc)
  const data = await fetch(`${API_URL}/media-items?imdbId=${imdbId}`)
  mediaData = await data.json().then((res) => (res ? res[0] : null))

  const provider = Object.keys(PROVIDERS)
  const filters = {
    imdbId: mediaData.data.parent_imdbid || imdbId,
    provider,
    ...(mediaData.seasonNum ? { seasonNum: mediaData.seasonNum } : {}),
    ...(mediaData.episodeNum ? { episodeNum: mediaData.episodeNum } : {}),
  }

  const searchParams = new URLSearchParams(filters)

  let subtitles = []

  try {
    const result = await fetch(`${API_URL}/subtitles?${searchParams}`)
    subtitles = await result.json()
  } catch (e) {
    console.log(e)
  }

  return { props: { mediaData, subtitles }, revalidate: 1 }
}

export default Subs
